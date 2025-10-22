import { LeaseInput, createSchedule } from '../../../src/domain/lease';

export function createLeaseInput(): LeaseInput {
  return {
    companyId: "id",
    itemId: "id",
    price: 0,
    termMonths: 1,
    nominalRatePct: 0,
    startDate: new Date().toISOString(), // ISO date
    upfrontFee: 0,
    monthlyFee: 0,
  };
}

describe("Create schedule", () => {
  it("Should create new schedule for lease", () => {
    const testInput = createLeaseInput();

    testInput.termMonths = 12;

    const result = createSchedule(0, 0, testInput);

    expect(result.length).toEqual(testInput.termMonths);
  });
});