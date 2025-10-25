import { sendMessage } from "../utils/sendMessage.js";

export async function helpCommand(sender_psid) {
  const helpText =
    "📘 *Available Commands:*\n\n" +
    "/ping – check if I’m active\n" +
    "/help – list all commands\n" +
    "/remind – set a reminder (coming soon)\n" +
    "/ask – get an AI answer (Phase 3)";
  await sendMessage(sender_psid, helpText);
}
