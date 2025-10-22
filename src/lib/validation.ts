import { LeaseInput, leaseInputSchema } from "../domain/lease";
import { Payment, paymentSchema } from "../domain/payment";

export const validateLeaseInput = function(leaseInput: LeaseInput) {
  const result = leaseInputSchema.safeParse(leaseInput);
  return result;
}

export const validatePayment = function(payment: Payment) {
  const result = paymentSchema.safeParse(payment);
  return result;
}