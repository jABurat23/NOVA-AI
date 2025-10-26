import express from "express";
import fs from "fs";
import path from "path";
import { sendMessage } from "../utils/sendMessage.js";

const router = express.Router();

// Helper paths
const usersFile = path.resolve("./data/users.json");
const commandsDir = path.resolve("./commands");

// --- Dashboard Stats ---
router.get("/stats", (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile, "utf8"));
  const commandFiles = fs.readdirSync(commandsDir).filter(f => f.endsWith(".js"));

  res.json({
    activeUsers: users.length,
    totalCommands: commandFiles.length,
    uptime: process.uptime(),
    lastUpdated: new Date().toISOString(),
  });
});

// --- Commands ---
router.get("/commands", (req, res) => {
  const commandFiles = fs.readdirSync(commandsDir).filter(f => f.endsWith(".js"));
  const commands = commandFiles.map(file => file.replace(".js", ""));
  res.json(commands);
});

router.post("/commands/add", (req, res) => {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({ error: "Command name and code are required." });
  }

  const filePath = path.join(commandsDir, `${name}.js`);
  if (fs.existsSync(filePath)) {
    return res.status(409).json({ error: "Command already exists." });
  }

  fs.writeFileSync(filePath, code);
  res.json({ message: `✅ Command '${name}' created successfully.` });
});

router.delete("/commands/:name", (req, res) => {
  const commandFile = path.join(commandsDir, `${req.params.name}.js`);
  if (!fs.existsSync(commandFile)) {
    return res.status(404).json({ error: "Command not found." });
  }
  fs.unlinkSync(commandFile);
  res.json({ message: `🗑 Command '${req.params.name}' deleted.` });
});

// --- Conversations (for now just mock data) ---
router.get("/conversations", (req, res) => {
  const data = [
    { id: 1, user: "Owner", message: "/help", timestamp: "2025-10-25T08:00:00Z" },
    { id: 2, user: "Developer", message: "/status", timestamp: "2025-10-25T08:01:00Z" },
  ];
  res.json(data);
});

// --- Settings (read/write from .env or config file) ---
router.get("/settings", (req, res) => {
  const settings = {
    botName: process.env.BOT_NAME || "Messenger Bot",
    ownerId: process.env.OWNER_PSID,
    devId: process.env.DEV_PSID,
  };
  res.json(settings);
});

router.post("/settings/update", (req, res) => {
  const { botName } = req.body;
  if (!botName) return res.status(400).json({ error: "Missing botName" });

  // In a real system, you might persist this to a config file.
  res.json({ message: `✅ Bot name updated to ${botName}` });
});

export default router;

import { getRecentConversations } from "../services/conversationLogger.js";

router.get("/conversations", (req, res) => {
  const data = getRecentConversations(30);
  res.json(data);
});
