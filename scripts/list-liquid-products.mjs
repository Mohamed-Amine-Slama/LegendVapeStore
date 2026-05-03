// One-off: list LIQUID-category products with their current imageUrl.
// Run from vape-store-vitrine/ with: node scripts/list-liquid-products.mjs
import { MongoClient } from "mongodb";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l.trim() && !l.trim().startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    }),
);

const URI = env.MONGODB_URI;
const DB_NAME = env.MONGODB_DB ?? "legend-vape-store";

const client = new MongoClient(URI);
await client.connect();
const db = client.db(DB_NAME);
const docs = await db
  .collection("products")
  .find({ category: "LIQUID" })
  .project({ name: 1, brand: 1, imageUrl: 1, mlSize: 1, nicotineMg: 1 })
  .toArray();

console.log(JSON.stringify(docs, null, 2));
console.log(`\nTotal LIQUID products: ${docs.length}`);
await client.close();
