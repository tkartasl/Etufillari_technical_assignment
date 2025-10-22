import type { Lease } from "../domain/lease";
import { loadDB, saveDB } from "../lib/db";

export const addLease = function(lease: Lease) {
  const leases = loadDB();
  leases.push(lease);
  saveDB(leases);
}

export const getLeaseById = function(id: string): Lease | null {
  const leases = loadDB();
  const lease = leases.find(lease => lease.id === id)
  
  if (!lease) {
    return null;
  } else {
    return lease;
  }
}