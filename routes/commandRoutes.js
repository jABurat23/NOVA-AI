import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const commandsDir = path.resolve("./commands");

// 🧩 GET all commands
router.get("/", (req, res) => {
  try {
    const files = fs.readdirSync(commandsDir).filter(f => f.endsWith(".js"));
    const list = files.map(f => f.replace(".js", ""));
    res.json(list);
  } catch (err) {
    console.error("❌ Error listing commands:", err);
    res.status(500).json({ error: "Failed to load commands" });
  }
});

// ➕ Add new command
router.post("/", (req, res) => {
  const { name, code } = req.body;
  if (!name || !code) return res.status(400).json({ error: "Missing name or code" });

  const filePath = path.join(commandsDir, `${name}.js`);

  if (fs.existsSync(filePath))
    return res.status(400).json({ error: "Command already exists" });

  const fileContent = `
import { sendMessage } from "../utils/sendMessage.js";
export async function ${name}(sender_psid) {
  ${code}
}
`;
  fs.writeFileSync(filePath, fileContent);
  res.json({ success: true, message: `✅ Command '${name}' created.` });
});

// 🗑 Delete command
router.delete("/:name", (req, res) => {
  const { name } = req.params;
  const filePath = path.join(commandsDir, `${name}.js`);
  if (!fs.existsSync(filePath))
    return res.status(404).json({ error: "Command not found" });

  fs.unlinkSync(filePath);
  res.json({ success: true, message: `🗑 Command '${name}' deleted.` });
});

export default router;
