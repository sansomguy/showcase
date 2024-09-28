# Showcase


## Technology Stack
- Building a blog using `qwik` and `SST` framework to test out some of my favourite technologies at the moment.
- Leverages the serverless-http and qwik's nodeServerAdapter to deploy the QWIK app to AWS Lambda.
- Deploys a CDN router in front of the lambda function for BLAZINGLY FAST qwik performance.

## Folder Structure
 src
  - components
    - theme (components to help with styling)
      - [component] (folder for the component name)
        - index.tsx (the component)
        - style.css (the component's styles)
          - [sub-component]
            - index.tsx (the sub-component)
            - style.css (the sub-component's styles)
    - [experiment] (per experiment the components that are unique to it)
      - [component] (folder for the component name)
        - index.tsx (the component)
        - style.css (the component's styles)
  - routes (follows the standard qwik route structure)
  - style.css (global styles)

## Features

- Ability to define and deploy a serverless stack using `SST` framework.
- Ability to use the sst resouces during development & production.

## Local Development

1. `pnpx sst shell [--stage ${environment}]` - by default this uses your local user profile.
2. Within the new sst shell, `pnpm run dev`. This will allow you to dev in the normal QWIK local dev way but linked to the specified sst stage environment.

## Builds & Deployments

1. `pnpx sst shell --stage ${environment}` - by default this uses your local user profile.
2. Within the new sst shell, `pnpm run build` - this will build the project for the target sst environment.

## Outstanding Issues

- Ability to build & run the qwik development environment with multiplexer using sst dev
- Ability to install the sst project structure via `qwik add sst` command.
