import axios from "axios";
import { logConversation } from "../services/conversationLogger.js";

// ✅ Replace this with your bot's response logic
async function getBotResponse(userMessage) {
  // Here you can connect to OpenAI, Dialogflow, or your custom logic
  // For now, it just echoes the message with a friendly response
  return `You said: "${userMessage}". That's interesting! 😊`;
}

/**
 * Handles messages events from Messenger
 * @param {Object} event - The incoming webhook event
 */
export async function handleMessage(event) {
  try {
    const sender_psid = event.sender.id;
    const received_message = event.message?.text;

    if (!received_message) return;

    console.log(`📩 Message received from ${sender_psid}: ${received_message}`);

    // ✅ Log user message
    logConversation(sender_psid, received_message, "user");

    // ✅ Generate bot response
    const botResponse = await getBotResponse(received_message);

    // ✅ Send response back to Messenger
    await callSendAPI(sender_psid, botResponse);

    // ✅ Log bot response
    logConversation(sender_psid, botResponse, "bot");

  } catch (error) {
    console.error("❌ Error handling message:", error.message);
  }
}

/**
 * Sends messages via the Send API to Messenger
 */
async function callSendAPI(sender_psid, responseText) {
  const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

  const requestBody = {
    recipient: { id: sender_psid },
    message: { text: responseText },
  };

  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`,
      requestBody
    );
    console.log(`✅ Message sent to ${sender_psid}: ${responseText}`);
  } catch (err) {
    console.error("❌ Unable to send message:", err.response?.data || err.message);
  }
}
