import { YEAR } from "../../domain/lease";
import type { Payment } from "../../domain/payment";
import type { Installment, Lease } from "../../domain/lease";
import updateLease from "../../persistence/payment-repository";

export const recordPayment = function(payment: Payment, lease: Lease, installment: Installment): String {
  const monthlyRate = lease.nominalRatePct / 100 / YEAR;
  const interest = installment.balanceAfter * monthlyRate;
  
  lease.totals.totalPayments += payment.amount;
  lease.totals.totalInterest += interest;
  lease.totals.totalFees += installment.fee;
  lease.schedule = lease.schedule.map(installment =>
    installment.period === installment.period ? { ...installment, paid: true, } : installment
  );

  updateLease(lease);
  return `Remaining balance is ${installment.balanceAfter}`;
}; 