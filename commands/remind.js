import { sendMessage } from "../utils/sendMessage.js";
import { addReminder } from "../services/reminderStorage.js";

export async function remindCommand(sender_psid, args) {
  const usage = "🕒 Usage: /remind HH:MM message\nExample: /remind 19:30 take your meds";

  if (args.length < 3) {
    await sendMessage(sender_psid, usage);
    return;
  }

  const time = args[1];
  const text = args.slice(2).join(" ");

  if (!/^\d{2}:\d{2}$/.test(time)) {
    await sendMessage(sender_psid, "⚠️ Invalid time format. Use HH:MM (24-hour).");
    return;
  }

  addReminder({ psid: sender_psid, time, text });
  await sendMessage(sender_psid, `✅ Reminder set for ${time}: "${text}"`);
}
