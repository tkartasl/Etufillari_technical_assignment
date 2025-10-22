import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import LeaseService from '../src/application/lease-service';
import { apiKeyAuth } from '../src/lib/api-key-middleware';

const newLease: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const lease = req.body;

  if (lease == null) {
    context.res = {
      status: 400,
      body: { error: "Lease information missing" }
    }
    return;
  }
  
  const response = LeaseService.createLease(lease);
  context.res = {
    status: response.status,
    body: response.body,
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

export default apiKeyAuth(newLease);