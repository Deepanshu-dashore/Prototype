import dns from "node:dns";
 
dns.setServers(["192.168.43.1"]);
 
console.log("========== MONGODB DNS DEBUG ==========");
console.log("Node version:", process.version);
console.log("DNS servers:", dns.getServers());
 
dns.resolveSrv(
  "_mongodb._tcp.cluster0.qcsmhsb.mongodb.net",
  (err, records) => {
    console.log("SRV TEST:", err || records);
  }
);
 
const mongoose = await import("mongoose");
 
console.log("After mongoose import DNS:", dns.getServers());
 
const MONGODB_URI = process.env.MONGODB_URL;
 
if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URL");
}
 
let cached = global.mongoose;
 
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}
 
export const connect = async () => {
  if (cached.conn) return cached.conn;
 
  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    console.log("DNS before connect:", dns.getServers());
 
    cached.promise = mongoose.default.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
 
  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    cached.promise = null;
    throw error;
  }
 
  return cached.conn;
};
 
export default connect;