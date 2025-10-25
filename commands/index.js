import { pingCommand } from "./ping.js";
import { helpCommand } from "./help.js";

export const commands = {
  "/ping": pingCommand,
  "/help": helpCommand,
};
