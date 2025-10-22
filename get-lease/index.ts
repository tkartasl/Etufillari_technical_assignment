import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import LeaseService from '../src/application/lease-service';
import { apiKeyAuth } from '../src/lib/api-key-middleware';

const getLease: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const id = req.params.id?.toString();
  
  if (id == null) {
    context.res = {
      status: 400,
      body: "Lease id required"
    }
    return;
  }

  const response = LeaseService.fetchLease(id);
  context.res = response;
};

export default apiKeyAuth(getLease);