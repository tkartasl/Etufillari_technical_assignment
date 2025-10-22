import { AzureFunction, Context, HttpRequest } from "@azure/functions";

export const healthCheck: AzureFunction = async function (context: Context, req: HttpRequest) {
  context.res = {
    status: 200,
    body: {
      status: "Healthy",
      timestamp: new Date().toISOString(),
    },
  };
};