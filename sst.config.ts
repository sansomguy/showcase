export default $config({
  app(input) {
    return {
      name: "showcase-qwik",
      home: "aws",
      removal: input?.stage === "production" ? "retain" : "remove",
      providers: {
        aws: {
          region: "ap-southeast-2",
          profile: "default",
        },
      },
    };
  },
  async run() {
    const supabaseKey = new sst.Secret("SupabaseKey");
    const notionApiKey = new sst.Secret("NotionApiKey");

    const api = new sst.aws.Function("showcaseApi", {
      link: [supabaseKey, notionApiKey],
      bundle: "packages/qwik-app/.build",
      handler: "index.handler",
      url: true,
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
    });
    return {
      outputs: {
        api: api.url,
        router: router.url,
      },
    };
  },
});