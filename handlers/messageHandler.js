// handlers/messageHandler.js
import { sendMessage } from "../utils/sendMessage.js";
import { commands } from "../commands/index.js";
import { handleDynamicCommand } from "../services/dynamicCommandService.js";
import { authorize } from "../middlewares/authMiddleware.js";
import { updateSession } from "../services/sessionService.js";

export async function handleMessage(sender_psid, message) {
  try {
    const userMsg = message.trim();
    console.log(`📨 Message from ${sender_psid}: ${userMsg}`);

    // Track chat session
    updateSession(sender_psid, { lastMessage: userMsg });

    if (userMsg.startsWith("/")) {
      const args = userMsg.split(" ");
      const command = args[0].toLowerCase();

      // Check for registered commands
      if (commands[command]) {
        const allowed = await authorize(sender_psid, command);
        if (!allowed) {
          return await sendMessage(sender_psid, "🚫 You’re not authorized to use this command.");
        }
        await commands[command](sender_psid, args);
      } else {
        // Try dynamically added commands
        const handled = await handleDynamicCommand(sender_psid, command);
        if (!handled) {
          await sendMessage(sender_psid, "❓ Unknown command. Type /help for a list.");
        }
      }
    } else {
      // Normal conversation handling (no commands)
      await sendMessage(sender_psid, "🤖 I only respond to commands. Type /help to see options.");
    }
  } catch (error) {
    console.error("❌ Error handling message:", error.message);
    await sendMessage(sender_psid, "⚠️ Something went wrong while processing your message.");
  }
}
