/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "NotionApiKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "SupabaseKey": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "showcaseApi": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "showcaseCdnAccessLogs": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "showcaseRouter": {
      "type": "sst.aws.Router"
      "url": string
    }
  }
}
export {}
