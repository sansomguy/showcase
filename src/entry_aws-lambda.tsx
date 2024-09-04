/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Aws Lambda when building for production.
 *
 * Learn more about the Aws Lambda integration here:
 * - https://qwik.dev/docs/deployments/aws/
 *
 */
import {
  createQwikCity,
  type PlatformAwsLambda,
} from "@builder.io/qwik-city/middleware/aws-lambda";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import serverless from "serverless-http";
import "source-map-support/register";
import render from "./entry.ssr";

declare global {
  interface QwikCityPlatform extends PlatformAwsLambda {}
}

const { staticFile, router, fixPath, notFound } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
});

export const handler = serverless(
  {
    handle: (req: any, res: any) => {
      if (process.env.IS_OFFLINE) {
        req.url = fixPath(req.url);
      }
      staticFile(req, res, () => {
        router(req, res, () => {
          notFound(req, res, () => {});
        });
      });
    },
  },
  { binary: true }
);
