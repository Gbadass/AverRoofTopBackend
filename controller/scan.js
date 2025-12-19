import Scan from "../models/scan.js";

function getClientIp(req) {
  const xff = req.headers["x-forwarded-for"];
  if (xff) return String(xff).split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

export const createScan = async (req, res, next) => {
  try {
    const { table, pageUrl, referrer } = req.body;
    if (!table) return res.status(400).json({ message: "table is required" });

    const scan = await Scan.create({
      table: String(table),
      pageUrl: pageUrl || "",
      referrer: referrer || req.headers.referer || "",
      userAgent: req.headers["user-agent"] || "",
      ip: getClientIp(req),
    });

    res.status(201).json({ ok: true, scanId: scan._id });
  } catch (e) {
    next(e);
  }
};

export const getScanStats = async (req, res, next) => {
  try {
    const stats = await Scan.aggregate([
      { $group: { _id: "$table", scans: { $sum: 1 }, lastScanAt: { $max: "$createdAt" } } },
      { $sort: { scans: -1 } },
    ]);

    res.json({ stats });
  } catch (e) {
    next(e);
  }
};