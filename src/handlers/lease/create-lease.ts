import type { LeaseInput } from "../../domain/lease";
import type { Lease } from "../../domain/lease";
import { addLease } from "../../persistence/lease-repository";
import { newLeaseFromInput } from "../../domain/lease";

export const handleCreateLease = function (lease: LeaseInput): Lease {
  const newLease = newLeaseFromInput(lease);

  addLease(newLease);

  return newLease;
};