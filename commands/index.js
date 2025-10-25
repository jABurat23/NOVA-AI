// commands/index.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const commands = {};

// Dynamically import all commands
const commandFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith(".js") && file !== "index.js");

for (const file of commandFiles) {
  const { [file.replace(".js", "") + "Command"]: cmd } = await import(`./${file}`);
  const commandName = "/" + file.replace(".js", "");
  commands[commandName] = cmd;
}

console.log("✅ Commands loaded:", Object.keys(commands));
