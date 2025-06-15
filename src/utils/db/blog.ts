import type { RequestEvent } from "@builder.io/qwik-city";
import type { AttributeValue } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBClient,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { Resource } from "sst";

export const categories = [
  "Projects",
  "Thoughts",
  "Tips",
  "Experiments",
] as const;
export type BlogCategory = (typeof categories)[number];
export type BlogStatus = "LIVE" | "DRAFT";

export type DBBlogPost = {
  id: string;
  title: string;
  summary: string;
  created: string;
  last_edited: string;
  status: BlogStatus;
  category: BlogCategory;
  series: string;
  content: string;
};
export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  series: string;
  created: string;
  last_edited: string;
  status: BlogStatus;
  category: BlogCategory;
  href: string;
  content: string;
};

export class Blog {
  constructor(
    private readonly context: Pick<RequestEvent, "env" | "sharedMap">,
  ) {}
  async getPosts(category?: BlogCategory): Promise<Array<BlogPost>> {
    console.group("getPosts");
    const posts = await getBlogPostsFromDynamoDB();
    console.log(`Returned ${posts.length} from DB`);
    const result = posts.map(this.mapToBlogPost);
    const filteredByCategory = result
      .filter((blogs) => blogs.status === "LIVE")
      .filter((x) => !category || x.category === category);

    console.log(`Filtered ${result.length} posts for category ${category}`);
    console.groupEnd();
    return filteredByCategory;
  }

  async getPost(id: string): Promise<BlogPost | null> {
    const page = await getBlobPostFromDynamoDB(id);

    return page ? this.mapToBlogPost(page as any) : null;
  }

  getCategories() {
    return Promise.resolve(["Projects", "Thoughts"]);
  }

  private mapToBlogPost(post: DBBlogPost): BlogPost {
    return {
      ...post!,
      status: post.status as BlogStatus,
      last_edited: post.last_edited || post.created,
      series: post.series || "",
      summary: post.summary || "",
      content: post.content || "",
      category: post.category! as BlogCategory,
      href: `/blog/${post.category!.toLowerCase()}/posts/${post.id}/`, // trailiing slashe is important for routing
    };
  }
}

async function getBlogPostsFromDynamoDB() {
  const client = new DynamoDBClient();
  const posts = await client.send(
    new ScanCommand({
      TableName: Resource.showcaseBlogPosts.name,
    }),
  );

  if (!posts.Items) {
    return [];
  }

  const result = posts.Items.map(mapFromDynamoRow).filter(
    (x) => x.status === "LIVE",
  );

  return result;
}

async function getBlobPostFromDynamoDB(id: string) {
  const client = new DynamoDBClient();
  const command = new QueryCommand({
    TableName: Resource.showcaseBlogPosts.name,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": { S: id },
    },
  });
  const result = await client.send(command);

  const itemForId = result.Items?.map(mapFromDynamoRow) ?? [];

  return itemForId.length > 0 ? itemForId[0] : null;
}

function mapFromDynamoRow(row: Record<string, AttributeValue>): DBBlogPost {
  const result = Object.fromEntries(
    Object.entries(row).map(([key, value]) => [key, value.S] as const),
  ) as DBBlogPost;

  return result;
}
