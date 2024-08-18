import { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = async (event) => {
  const {} = event;
  if (import.meta.env.DEV) return; // Will not return CSP headers in dev mode
  const nonce = Date.now().toString(Math.random() * 100); // Your custom nonce logic here
  event.sharedMap.set("@nonce", nonce);
  const csp = [
    `default-src 'self' 'unsafe-inline'`,
    `font-src 'self'`,
    `img-src 'self' 'unsafe-inline' data:`,
    `script-src 'wasm-unsafe-eval' 'self' 'unsafe-inline' https: 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline'`,
    `frame-src 'self' 'nonce-${nonce}'`,
    `object-src 'none'`,
    `base-uri 'self'`,
  ];

  event.headers.set("Content-Security-Policy", csp.join("; "));
};
