import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { apiKeyAuth } from '../src/lib/api-key-middleware';
import { quoteSchema } from '../src/domain/quote';
import { quoteService } from '../src/application/quote-service';

const getQuote: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const result = quoteSchema.safeParse(req.query);
  if(!result.success) {
    context.res = {
      status: 400,
      body: result.error
    };
  } else {
    const response = quoteService(result.data);

    context.res = {
      status: response.status,
      body: response.body,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }
};

export default apiKeyAuth(getQuote);