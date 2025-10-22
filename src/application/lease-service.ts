import type { LeaseInput } from "../domain/lease";
import { validateLeaseInput } from "../lib/validation";
import { handleGetLease } from "../handlers/lease/get-lease";
import { handleCreateLease } from "../handlers/lease/create-lease";

class LeaseService {
  createLease(leaseInput: LeaseInput) {
    const result = validateLeaseInput(leaseInput);
  
    if(!result.success) {
      return {
        status: 400,
        body: result.error
      };
    }
  
    const newLease = handleCreateLease(leaseInput);
  
    return {
      status: 200,
      body: newLease
    };
  };
  
  fetchLease(id: string) {
    const lease = handleGetLease(id);
  
    if (!lease) {
      return {
        status: 404,
        body: { error: "Lease not found" }
      };
    } else {
      return {
        status: 200,
        body: lease
      };
    }
  };
}

export default new LeaseService();