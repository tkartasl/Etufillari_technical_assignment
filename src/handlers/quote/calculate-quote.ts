import { LeaseInput, newLeaseFromInput } from "../../domain/lease";
import { leaseToQuote, type Quote } from "../../domain/quote";

const calculateQuote = function(leaseInput: LeaseInput): Quote {
  const lease = newLeaseFromInput(leaseInput);
  return leaseToQuote(lease);
};

export default calculateQuote;