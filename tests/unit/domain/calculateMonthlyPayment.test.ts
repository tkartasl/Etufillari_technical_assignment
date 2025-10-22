import { createLeaseInput } from './createSchedule.test';
import { calculateMonthlyPayment } from "../../../src/domain/lease";

describe("calculateMonthlyPayment", () => {
  let input = createLeaseInput();
  it("should calculate correct monthly payment for non-zero interest", () => {
    input.price = 10000;
    input.termMonths = 12;
    input.nominalRatePct = 6;

    const monthlyRate = input.nominalRatePct / 100 / 12;
    const result = calculateMonthlyPayment(monthlyRate, input);

    expect(result).toBeCloseTo(860.66, 2);
  });

  it("should handle zero interest correctly", () => {
    input.price = 1200;
    input.termMonths = 12;
    input.nominalRatePct = 0;

    const monthlyRate = 0;
    const result = calculateMonthlyPayment(monthlyRate, input);

    expect(result).toBeCloseTo(100, 2);
  });

  it("should handle very short term correctly", () => {
    input.price = 1000;
    input.termMonths = 1;
    input.nominalRatePct = 12;

    const monthlyRate = input.nominalRatePct / 100 / 12;
    const result = calculateMonthlyPayment(monthlyRate, input);

    expect(result).toBeCloseTo(1010, 1);
  });
});

