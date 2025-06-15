import { z, type RequestHandler } from "@builder.io/qwik-city";
import type { DBBlogPost } from "~/utils/db/blog";
import { NotionUtils } from "~/utils/notion";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { Resource } from "sst";

export const onPost: RequestHandler = async (event) => {
  const { json } = event;
  try {
    const notionUtils = NotionUtils();
    console.log("fetching notion pages");
    const pageIds = await notionUtils.getProjectsPosts();

    const pages = (
      await Promise.all(
        pageIds.map(async (page) => await notionUtils.getPage(page)),
      )
    ).map(
      ([info, markdown]) =>
        ({
          ...info,
          category: info.category as DBBlogPost["category"],
          series: info.series as DBBlogPost["series"],
          status: info.status as DBBlogPost["status"],
          content: markdown,
        }) satisfies DBBlogPost,
    );

    await upsertBlogToDynamoDB(pages);

    json(200, pages);
  } catch (e: any) {
    console.error("Error creating notion pages", e);
    json(500, { error: e });
  }
};

async function upsertBlogToDynamoDB(posts: DBBlogPost[]) {
  const client = new DynamoDBClient();

  const results = await Promise.allSettled(
    posts.map(async (post) => {
      const item = {
        id: { S: post.id },
        title: { S: post.title },
        summary: { S: post.summary },
        created: { S: post.created },
        last_edited: { S: post.last_edited },
        status: { S: post.status },
        category: { S: post.category },
        series: { S: post.series },
        content: { S: post.content },
      };

      const typedResult = await blogPostDBSchema.parseAsync(item);

      const command = new PutItemCommand({
        TableName: Resource.showcaseBlogPosts.name,
        Item: typedResult,
      });

      await client.send(command);
    }),
  );
  const badResults = results.filter((x) => x.status !== "fulfilled");
  if (badResults.length > 0) {
    const [firstBadResult] = badResults;
    const zodError = firstBadResult.reason as z.ZodError;
    console.dir(zodError);
    throw new Error("Zod error, see above log for details");
  }
}

const blogPostDBSchema = z.object({
  id: z.object({
    S: z.string(),
  }),
  title: z.object({
    S: z.string(),
  }),
  summary: z.object({
    S: z.string(),
  }),
  created: z.object({
    S: z.string(),
  }),
  last_edited: z.object({
    S: z.string(),
  }),
  status: z.object({
    S: z
      .string()
      .nullish()
      .refine(
        (x) => x === "LIVE" || x === "DRAFT" || x === undefined || x === null,
      )
      .transform((x) => (!x ? "DRAFT" : x)),
  }),
  category: z.object({
    S: z
      .string()
      .nullish()
      .transform((x) => (!x ? "" : x)),
  }),
  series: z.object({
    S: z
      .string()
      .nullish()
      .transform((x) => (!x ? "" : x)),
  }),
  content: z.object({
    S: z
      .string()
      .nullish()
      .transform((x) => (!x ? "" : x)),
  }),
});
