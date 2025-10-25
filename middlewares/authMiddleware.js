// middlewares/authMiddleware.js
import dotenv from "dotenv";
import { sendMessage } from "../utils/sendMessage.js";

dotenv.config();

const OWNER_PSID = process.env.OWNER_PSID;
const DEVELOPER_PSIDS = process.env.DEVELOPER_PSIDS
  ? process.env.DEVELOPER_PSIDS.split(",")
  : [];

export async function authorize(sender_psid, commandName) {
  // Owner always has full access
  if (sender_psid === OWNER_PSID) return true;

  // Developers have partial access
  if (DEVELOPER_PSIDS.includes(sender_psid)) {
    const restricted = ["/addcommand", "/deleteuser", "/reset"]; // example restricted commands
    if (restricted.includes(commandName)) {
      await sendMessage(sender_psid, "🚫 That command is reserved for the owner.");
      return false;
    }
    return true;
  }

  // Everyone else (normal users)
  await sendMessage(sender_psid, "🚫 You’re not authorized to use this bot.");
  return false;
}

export function getUserRole(sender_psid) {
  if (sender_psid === OWNER_PSID) return "👑 Owner";
  if (DEVELOPER_PSIDS.includes(sender_psid)) return "🧑‍💻 Developer";
  return "👤 User";
}
