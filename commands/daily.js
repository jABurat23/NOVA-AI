import { sendMessage } from "../utils/sendMessage.js";

export async function dailyCommand(sender_psid) {
  await sendMessage(
    sender_psid,
    "🌅 You’ll now receive a daily morning message at 9 AM."
  );
}
