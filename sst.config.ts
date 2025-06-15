/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "showcase-qwik",
      home: "aws",
      removal: input.stage === "production" ? "retain" : "remove",
      providers: {
        aws: {
          region: "ap-southeast-2",
          profile: "default",
        },
      },
    };
  },
  async run() {
    const supabaseKey = new sst.Secret("SupabaseKey"); // supabase account has been shutdown and using dynamodb instead
    const notionApiKey = new sst.Secret("NotionApiKey");

    const dynamoDbBlogPosts = new sst.aws.Dynamo("showcaseBlogPosts", {
      fields: {
        id: "string",
      },
      primaryIndex: { hashKey: "id" },
    });
    // other values that could be used as content in the blog posts
    // title: "string",
    // summary: "string",
    // status: "string",
    // category: "string",
    // series: "string",
    // created: "string",
    // last_edited: "string",

    const api = new sst.aws.Function("showcaseApi", {
      link: [supabaseKey, notionApiKey, dynamoDbBlogPosts],
      bundle: "./.build",
      handler: "index.handler",
      url: true,
      live: false,
    });

    const router = new sst.aws.Router("showcaseRouter", {
      domain:
        $app.stage === "sansomguy" // personal dev stage
          ? {
              name: "dev.joshs.au",
            }
          : {
              name: "joshs.au",
              redirects: ["www.joshs.au"],
            },

      routes: {
        "/*": api.url,
      },
      invalidation: true,
    });
    return {
      outputs: {
        api: api.url,
        router: router.url,
      },
    };
  },
});
