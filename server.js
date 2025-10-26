import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import fs from "fs";
import { handleMessage } from "./handlers/messageHandler.js";
import { startDailyQuotes } from "./services/dailyQuoteService.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import commandRoutes from "./routes/commandRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";



dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use("/api", dashboardRoutes);
app.use("/api/commands", commandRoutes);
app.use("/api/settings", settingsRoutes);


// --- VERIFY WEBHOOK ---
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("✅ Webhook verified!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// --- HELPER TO SAVE USER IDs ---
function saveUserId(psid) {
  const filePath = "./data/users.json";
  const users = JSON.parse(fs.readFileSync(filePath, "utf8"));
  if (!users.includes(psid)) {
    users.push(psid);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    console.log(`🆕 Added new user: ${psid}`);
  }
}

// --- RECEIVE MESSAGES ---
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;

      // Store user ID automatically
      saveUserId(sender_psid);

      const message = webhook_event.message?.text;
      if (message) await handleMessage(sender_psid, message);
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// --- START DAILY QUOTES ---
startDailyQuotes();
