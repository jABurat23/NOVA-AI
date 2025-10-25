import cron from "node-cron";
import { sendMessage } from "../utils/sendMessage.js";
import { loadReminders } from "./reminderStorage.js";

// Run every minute to check reminders
cron.schedule("* * * * *", async () => {
  const reminders = loadReminders();

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  for (const reminder of reminders) {
    const [hour, minute] = reminder.time.split(":").map(Number);

    if (hour === currentHour && minute === currentMinute) {
      await sendMessage(reminder.psid, `⏰ Reminder: ${reminder.text}`);
    }
  }
});

// Example daily scheduled message (9 AM)
cron.schedule("0 9 * * *", async () => {
  const dailyMessage = "🌞 Good morning! Hope you have an awesome day ahead!";
  // Replace with your own PSID (your user ID)
  const YOUR_PSID = process.env.OWNER_PSID;

  await sendMessage(YOUR_PSID, dailyMessage);
});
