const dns = require("dns");const { MongoClient } = require("mongodb");
dns.setServers(["192.168.43.1"]);
const uri = process.env.MONGODB_URL;
console.log("DNS:", dns.getServers());console.log("URI exists:", !!uri);
if (!uri) {
  throw new Error("MONGODB_URL is not loaded");
}
const client = new MongoClient(uri);
client.connect()
  .then(() => {
    console.log("✅ MONGODB DRIVER CONNECTED");
  })
  .catch((error) => {
    console.error("❌ MONGODB DRIVER ERROR:");
    console.error(error);
  });
 