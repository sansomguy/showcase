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
      bundle: "./.build",
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
      transform: {
        cdn: {
          origins: [
            {
              originId: api.name,
              domainName: api.url.apply((url) => url.replace("https://", "")),
            },
          ],
          defaultCacheBehavior: {
            targetOriginId: api.name,
            viewerProtocolPolicy: "redirect-to-https",
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD"],
            forwardedValues: {
              queryString: true,
              headers: ["*"],
              cookies: {
                forward: "all",
              },
            },
            minTtl: 0,
            defaultTtl: 0,
            maxTtl: 0,
            compress: true,
          },
        },
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
