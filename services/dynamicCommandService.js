import fs from "fs";
import { sendMessage } from "../utils/sendMessage.js";

const FILE_PATH = "./data/dynamicCommands.json";

function loadDynamicCommands() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function saveDynamicCommands(commands) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(commands, null, 2));
}

export function addDynamicCommand(name, response) {
  const commands = loadDynamicCommands();
  commands[name] = response;
  saveDynamicCommands(commands);
}

export function getDynamicCommand(name) {
  const commands = loadDynamicCommands();
  return commands[name];
}

export async function handleDynamicCommand(sender_psid, command) {
  const response = getDynamicCommand(command);
  if (response) {
    await sendMessage(sender_psid, response);
    return true;
  }
  return false;
}
