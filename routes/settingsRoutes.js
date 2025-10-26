import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const settingsFile = path.resolve("./data/settings.json");

// 🧩 GET settings
router.get("/", (req, res) => {
  const data = JSON.parse(fs.readFileSync(settingsFile, "utf8"));
  res.json(data);
});

// 📝 Update settings
router.post("/", (req, res) => {
  const newSettings = req.body;
  fs.writeFileSync(settingsFile, JSON.stringify(newSettings, null, 2));
  res.json({ success: true, message: "Settings updated successfully!" });
});

export default router;
