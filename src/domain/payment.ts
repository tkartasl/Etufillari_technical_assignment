import type { Lease, Money } from "./lease.ts"
import * as z from "zod";
import { Installment } from "./lease";

export type Payment = {
  id: string;
  leaseId: string;
  paidAt: string;
  amount: Money;
};

export const paymentSchema = z.object({
  id: z.string(),
  leaseId: z.string(),
  paidAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid ISO date format" }),
  amount: z.number().nonnegative(),
});

export type Validation = {
  status: string,
  message: string
  installment: Installment | null
};

export const validatePaymentData = function(payment: Payment, lease: Lease): Validation {
  const installment = lease.schedule.find(i => !i.paid);

  if (!installment) {
    return { status: "Invalid", message: "No installments found", installment: null };
  }

  const paidAt = new Date(payment.paidAt);
  const dueDate = new Date(installment.dueDate);

  if (paidAt > dueDate) {
    return { status: "Invalid", message: "Payment is late", installment: null };
  }

  if (payment.amount < installment.payment || payment.amount > installment.payment) {
    return {
      status: "Invalid",
      message: `Paid amount is different than the required monthly payment of ${installment.payment.toFixed(2)}`,
      installment: null
    };
  }

  return { status: "Valid", message: "", installment: installment };
};