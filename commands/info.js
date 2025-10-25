// commands/info.js
import axios from "axios";
import dotenv from "dotenv";
import { sendMessage } from "../utils/sendMessage.js";
import { getSession } from "../services/sessionService.js";

dotenv.config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Assign each user their own emoji badge 🪪
const userEmojis = {
  "your_facebook_user_id_here": "👑", // YOU (owner)
  "default": "👤", // everyone else
};

export async function infoCommand(sender_psid) {
  try {
    // Fetch user data from Facebook Graph API
    const userRes = await axios.get(
      `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`
    );
    const user = userRes.data;

    const session = getSession(sender_psid);
    const emoji = userEmojis[sender_psid] || userEmojis.default;

    const infoMessage = `
${emoji} **User Info**
━━━━━━━━━━━━━━━
📛 **Name:** ${user.first_name} ${user.last_name}
🆔 **PSID:** ${sender_psid}
💬 **Last Message:** ${session?.lastMessage || "N/A"}
🕒 **Last Active:** ${session?.lastActive || "Unknown"}
`;

    await sendMessage(sender_psid, infoMessage);
  } catch (error) {
    console.error("❌ Error fetching user info:", error.message);
    await sendMessage(sender_psid, "⚠️ Unable to retrieve user info right now.");
  }
}
