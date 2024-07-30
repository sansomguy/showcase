import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import * as marked from "marked";

const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionToMarkdown = new NotionToMarkdown({
  notionClient,
});

const databaseId = "85f877be9fdd474087997f9932855145";

async function getAllProjects() {
  const databaseResponse = await notionClient.databases.query({
    database_id: "85f877be9fdd474087997f9932855145",
    filter_properties: ["title"],
  });

  const pages = databaseResponse.results.map((page) => page.id);

  return pages;
}

export const onGet: RequestHandler = async ({ json, html, params }) => {
  console.dir(params);
  // load the page from notion
  // const databaseResponse = await notionClient.databases.retrieve({
  //   database_id: "85f877be9fdd474087997f9932855145",
  // });
  const databaseResponse = await notionClient.databases.query({
    database_id: "85f877be9fdd474087997f9932855145",
    filter_properties: ["title"],
  });
  const pageResponse = await notionClient.pages.retrieve({
    page_id: "d227221af94046b69d1d57bd0c9b053d",
  });

  const blocks = await notionToMarkdown.pageToMarkdown(pageResponse.id);
  // const mdblocks = await notionToMarkdown.pageToMarkdown(pageResponse.id);
  // console.dir(mdblocks);
  // // convert to markdown
  const markdown = notionToMarkdown.toMarkdownString(blocks);

  json(200, databaseResponse);

  // console.dir(markdown);

  // // markdown to html
  // const content = htmlConverter.makeHtml(markdown.parent);

  // return the markdown
  // html(200, await marked.parse(markdown.parent));
};
