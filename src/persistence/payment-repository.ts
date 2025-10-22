import type { Lease } from "../domain/lease";
import { saveDB, loadDB } from "../lib/db";

const updateLease = async function(updatedLease: Lease) {
  const leases = loadDB();

  const newLeases = leases.map(lease =>
    lease.id === updatedLease.id ? updatedLease : lease
  );
  saveDB(newLeases);
};

export default updateLease;