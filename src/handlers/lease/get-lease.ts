import type { Lease } from "../../domain/lease";
import { getLeaseById } from "../../persistence/lease-repository";

export const handleGetLease = function(id: string): Lease | null {
  return getLeaseById(id);
};