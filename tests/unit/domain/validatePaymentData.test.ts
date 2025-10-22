import { validatePaymentData } from '../../../src/domain/payment';
import { createLeaseInput } from './createSchedule.test';
import { newLeaseFromInput } from '../../../src/domain/lease';

const now = new Date();

const testLease = {
  ...newLeaseFromInput(createLeaseInput()),
  schedule: [
    {
      period: 1,
      dueDate: now.toISOString(),
      payment: 100,
      interest: 0,
      principal: 100,
      fee: 0,
      balanceAfter: 1000,
      paid: false
    }
  ]
};

describe("validatePaymentData", () => {
  it("Should return status Valid", () => {
    const payment = {
      id: "",
      leaseId: testLease.id,
      paidAt: now.toISOString(),
      amount: 100
     };

    const result = validatePaymentData(payment, testLease);

    expect(result.status).toEqual("Valid");
  });

  it("Amount less than payment, should return status Invalid", () => {
    const latePayment = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const payment = {
      id: "",
      leaseId: testLease.id,
      paidAt: latePayment.toISOString(),
      amount: 100
     };

    const result = validatePaymentData(payment, testLease);

    expect(result.status).toEqual("Invalid");
    expect(result.message).toEqual("Payment is late");
  });

  it("Payment is late, should return status Invalid", () => {
    const payment = {
      id: "",
      leaseId: testLease.id,
      paidAt: now.toISOString(),
      amount: 90
     };

    const result = validatePaymentData(payment, testLease);

    expect(result.status).toEqual("Invalid");
    expect(result.message).toEqual(`Paid amount is different than the required monthly payment of ${testLease.schedule[0].payment.toFixed(2)}`);
  });
});