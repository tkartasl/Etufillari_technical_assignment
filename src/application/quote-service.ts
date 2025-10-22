import type { LeaseInput } from "../domain/lease";
import calculateQuote from "../handlers/quote/calculate-quote";

export const quoteService = function(leaseInput: LeaseInput) {
  const quote = calculateQuote(leaseInput);

  return {
    status: 200,
    body: quote
  };
}