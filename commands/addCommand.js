// commands/addcommand.js
import fs from "fs";
import path from "path";
import { sendMessage } from "../utils/sendMessage.js";

export async function addcommandCommand(sender_psid, args) {
  try {
    if (sender_psid !== process.env.OWNER_PSID) {
      return await sendMessage(sender_psid, "🚫 You’re not allowed to add commands.");
    }

    // Parse command and response
    const [commandName, ...responseParts] = args.slice(1);
    const responseText = responseParts.join(" ").trim();

    if (!commandName || !responseText) {
      return await sendMessage(sender_psid, "⚙️ Usage: /addcommand /greet Hello there!");
    }

    const fileName = commandName.replace("/", "") + ".js";
    const filePath = path.join("commands", fileName);

    if (fs.existsSync(filePath)) {
      return await sendMessage(sender_psid, "⚠️ That command already exists.");
    }

    const fileContent = `import { sendMessage } from "../utils/sendMessage.js";

export async function ${commandName.replace("/", "")}Command(sender_psid) {
  await sendMessage(sender_psid, \`${responseText}\`);
}`;

    fs.writeFileSync(filePath, fileContent, "utf-8");

    await sendMessage(sender_psid, `✅ New command *${commandName}* created successfully!`);
  } catch (error) {
    console.error("❌ Error creating command:", error.message);
    await sendMessage(sender_psid, "⚠️ Failed to create new command.");
  }
}
