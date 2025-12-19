import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    table: { type: String, required: true, index: true },
    pageUrl: { type: String },
    referrer: { type: String },
    userAgent: { type: String },
    ip: { type: String },
    // you can enrich later (country, city) using a geo service if you want
  },
  { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);
