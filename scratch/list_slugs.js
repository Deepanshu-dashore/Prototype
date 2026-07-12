const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Parse .env locally
const envPath = path.join(__dirname, "..", ".env");
if (!fs.existsSync(envPath)) {
  console.error(".env file not found at " + envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const match = envContent.match(/MONGODB_URL\s*=\s*(.+)/);
if (!match) {
  console.error("MONGODB_URL not found in .env");
  process.exit(1);
}

const mongodbUrl = match[1].trim().replace(/['"]/g, "");

// Define schema
const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

async function main() {
  console.log("Connecting to database...");
  await mongoose.connect(mongodbUrl);
  console.log("Connected. Fetching blogs...");

  const blogs = await Blog.find({}, "title slug").lean();
  console.log("\n--- Stored Blogs ---");
  blogs.forEach((b) => {
    console.log(`Title: ${b.title}`);
    console.log(`Slug:  ${b.slug}`);
    console.log("-------------------");
  });

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
