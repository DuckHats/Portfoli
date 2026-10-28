import type { IncomingMessage, ServerResponse } from 'node:http'

// Minimal shapes of the helpers the Vercel Node runtime adds to req/res. Declared here so the
// project does not depend on the (heavy) @vercel/node package just for types.
export type ApiRequest = IncomingMessage

export type ApiResponse = ServerResponse & {
  status(code: number): ApiResponse
  json(body: unknown): ApiResponse
}
