import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { commands } from "./commands/index.js";
import { sendMessage } from "./utils/sendMessage.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

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

// --- RECEIVE MESSAGES ---
app.post("/webhook", async (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    for (const entry of body.entry) {
      const webhook_event = entry.messaging[0];
      const sender_psid = webhook_event.sender.id;

      if (webhook_event.message && webhook_event.message.text) {
        const userMsg = webhook_event.message.text.trim();
        console.log("📩 Received:", userMsg);

        if (userMsg.startsWith("/")) {
          const command = userMsg.split(" ")[0].toLowerCase();
          const handler = commands[command];

          if (handler) {
            await handler(sender_psid);
          } else {
            await sendMessage(sender_psid, "❓ Unknown command. Try /help");
          }
        } else {
          await sendMessage(sender_psid, "🤖 I only respond to commands. Type /help.");
        }
      }
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 3000}`)
);
