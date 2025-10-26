import fs from "fs";
import cron from "node-cron";
import { sendMessage } from "../utils/sendMessage.js";
import { QUOTES, IMAGES } from "../data/quotes.js";

export function startDailyQuotes() {
  cron.schedule("0 8 * * *", async () => {
    console.log("🕗 Sending daily quotes globally...");

    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const image = IMAGES[Math.floor(Math.random() * IMAGES.length)];

    // Load all users
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    if (users.length === 0) {
      console.log("⚠️ No users to send to yet.");
      return;
    }

    for (const psid of users) {
      try {
        await sendMessage(psid, quote);
        await sendMessage(psid, {
          attachment: { type: "image", payload: { url: image } },
        });
      } catch (err) {
        console.error(`❌ Failed to send to ${psid}:`, err.message);
      }
    }

    console.log(`✅ Sent daily quote to ${users.length} users.`);
  });
}
