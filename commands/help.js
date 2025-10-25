import fs from "fs";
import path from "path";
import { sendMessage } from "../utils/sendMessage.js";
import { getUserRole } from "../middlewares/authMiddleware.js";

export async function helpCommand(sender_psid) {
  const commandFiles = fs
    .readdirSync("commands")
    .filter((file) => file.endsWith(".js") && file !== "index.js");

  const commandsList = commandFiles
    .map((file) => `/${file.replace(".js", "")}`)
    .sort()
    .join("\n");

  const role = getUserRole(sender_psid);

  const helpText = `
📘 *Bot Command Reference*
━━━━━━━━━━━━━━━━━━━━━━━
${role === "👑 Owner" ? "🔐 You have full control privileges." : ""}
${role === "🧑‍💻 Developer" ? "🧠 You have developer-level access." : ""}
${role === "👤 User" ? "💬 You can only use public commands." : ""}

💬 *Available Commands:*
${commandsList}

━━━━━━━━━━━━━━━━━━━━━━━
✨ *Tip:* Type */command* to execute it.
`;

  await sendMessage(sender_psid, helpText);
}
