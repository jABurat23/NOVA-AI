import fs from "fs";
import path from "path";

const conversationsFile = path.resolve("./data/conversations.json");

/**
 * Save a new message event into the conversations log
 */
export function logConversation(sender_psid, message, role = "user") {
  try {
    const conversations = JSON.parse(fs.readFileSync(conversationsFile, "utf8"));
    const newEntry = {
      id: Date.now(),
      sender_psid,
      message,
      role,
      timestamp: new Date().toISOString(),
    };

    conversations.push(newEntry);
    fs.writeFileSync(conversationsFile, JSON.stringify(conversations, null, 2));
    console.log(`💬 Logged message from ${sender_psid}: "${message}"`);
  } catch (err) {
    console.error("❌ Failed to log conversation:", err);
  }
}

/**
 * Get the latest N conversations
 */
export function getRecentConversations(limit = 20) {
  try {
    const conversations = JSON.parse(fs.readFileSync(conversationsFile, "utf8"));
    return conversations.slice(-limit).reverse();
  } catch {
    return [];
  }
}
