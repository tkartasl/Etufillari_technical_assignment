import type { Installment, Money, Lease } from "./lease";
import * as z from "zod";

export type Quote = LeaseInput & {
  schedule: Installment[];
  totals: { 
    totalPayments: Money; 
    totalInterest: Money;
    totalFees: Money
  };
};

export const quoteSchema = z.object({
  companyId: z.string().default("id"),
  itemId: z.string().default("item_id"),
  price: z.preprocess((v) => parseFloat(v as string), z.number().nonnegative()),
  termMonths: z.preprocess((v) => parseInt(v as string, 10), z.number().int().positive()),
  nominalRatePct: z.preprocess((v) => parseFloat(v as string), z.number().nonnegative()),
  startDate: z
    .string()
    .default(new Date().toISOString())
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  upfrontFee: z.preprocess((v) => parseFloat(v as string), z.number().nonnegative().default(0)),
  monthlyFee: z.preprocess((v) => parseFloat(v as string), z.number().nonnegative().default(0)),
});

export type LeaseInput = z.infer<typeof quoteSchema>;

export const leaseToQuote = function(lease: Lease): Quote {
  const { id, createdAt, ...quote } = lease;
  return quote;
};