/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "showcase-qwik",
      home: "aws",
      removal: input.stage === "prod" ? "retain" : "remove",
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

    const email = new sst.aws.Email("showcaseEmailer", {
      sender: "joshs.au",
      dmarc: "v=DMARC1; p=quarantine; adkim=s; aspf=s;",
      dns: sst.aws.dns({
        zone: "Z045780229AFK28DHDD2",
      }),
    });

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
    //

    const router = new sst.aws.Router("showcaseRouter", {
      domain:
        $app.stage === "sansomguy" // personal dev stage
          ? {
            name: "dev.joshs.au",
          }
          : {
            name: "joshs.au",
            redirects: ['www.joshs.au'],
            aliases: ["*.joshs.au"]
          },
      invalidation: {
        paths: ["/*"],
      },
    });

    const api = new sst.aws.Function("showcaseApi", {
      link: [supabaseKey, notionApiKey, dynamoDbBlogPosts, router, email],
      bundle: "./.build",
      handler: "index.handler",
      url: {
        router: {
          instance: router,
          domain: 'joshs.au'
        },
      },
      dev: false,
    });

    return {
      outputs: {
        router: router.url,
        api: api.url,
      },
    };
  },
});
