import { sendMessage } from "../utils/sendMessage.js";
import { askOpenAI } from "../services/openaiService.js";
import { askFallbackAI } from "../services/fallbackService.js";

export async function askCommand(sender_psid, args) {
  const question = args.slice(1).join(" ");

  if (!question) {
    await sendMessage(sender_psid, "💬 Usage: /ask [your question]");
    return;
  }

  await sendMessage(sender_psid, "🤔 Thinking...");

  let answer = await askOpenAI(question);

  if (!answer) {
    console.log("🔁 Falling back to Gemini AI...");
    answer = await askFallbackAI(question);
  }

  await sendMessage(sender_psid, `💡 ${answer}`);
}
