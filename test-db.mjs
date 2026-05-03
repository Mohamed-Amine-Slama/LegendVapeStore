import { MongoClient } from "mongodb";

async function check() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found");
    process.exit(1);
  }
  console.log("URI found, attempting connection...");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_DB ?? "legend-vape-store");
    const count = await db.collection("products").countDocuments();
    console.log(`Connected successfully! Found ${count} products in the database.`);
  } catch (e) {
    console.error("Connection failed:", e);
  } finally {
    await client.close();
  }
}
check();