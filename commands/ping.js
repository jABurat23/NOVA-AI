import { sendMessage } from "../utils/sendMessage.js";

export async function pingCommand(sender_psid) {
  await sendMessage(sender_psid, "🏓 Pong! I'm online.");
}
