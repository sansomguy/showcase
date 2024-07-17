# Showcase

Qwik City to see what it's all about.

## Architecture

Just 1 deployment target. `aws lambda` through `serverless` framework.

Navigate to [server@jamber](https://app.serverless.com/jamber/apps) so see the app dashboard.

It's called qwik-lambda-app, and there is only 1 service `qwik-lambda-app` with 1 stage `prod`.

Run `pnpm run deploy` to deploy the service.

Run `npx serverless remove --stage prod --region ap-southeast-2` to remove the service.
