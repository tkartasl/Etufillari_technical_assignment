import { AzureFunction } from "@azure/functions";

export function apiKeyAuth(handler: AzureFunction): AzureFunction {
  return async (context, req) => {
    const expected = process.env.API_KEY;
    const provided = req.headers['x-api-key'];

    if (!expected) {
      context.log.error('API_KEY not configured in environment');
      context.res = { status: 500, body: "Server configuration error" };
      return;
    }

    if (!provided || provided !== expected) {
      context.res = { status: 401, body: "Unauthorized: Missing or invalid API key" };
      return;
    }

    await Promise.resolve(handler(context, req));
  };
}

