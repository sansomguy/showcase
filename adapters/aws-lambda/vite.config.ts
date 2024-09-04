import { nodeServerAdapter } from "@builder.io/qwik-city/adapters/node-server/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import { builtinModules } from "module";
import { Resource } from "sst";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    ssr: {
      // This configuration will bundle all dependencies, except the node builtins (path, fs, etc.)
      external: [...builtinModules],
      noExternal: /./,
    },
    build: {
      ssr: true,
      rollupOptions: {
        input: ["./src/entry_aws-lambda.tsx", "@qwik-city-plan"],
      },
    },
    plugins: [
      nodeServerAdapter({
        ssg: {
          origin: Resource.App.stage === "production" ? "https://www.joshs.au" : "https://dev.joshs.au",
          include: ["/*/posts/*", "/experiments/caching/ssg"],
        },
      }),
    ],
  };
});
