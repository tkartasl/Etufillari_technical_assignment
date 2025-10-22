import fs from "fs";
import type { Lease } from "../domain/lease";

const DB_FILE = "../../db.json";

export function loadDB(): Lease[] {
  if (!fs.existsSync(DB_FILE)) return [];
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

export function saveDB(data: Lease[]) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}