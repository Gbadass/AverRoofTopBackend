export function requireAdminKey(req, res, next) {
    const key = req.header("x-api-key");
    if (!process.env.ADMIN_KEY) return res.status(500).json({ message: "ADMIN_KEY not set" });
    if (!key || key !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  }
  