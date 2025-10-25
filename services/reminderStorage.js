import fs from "fs";

const FILE_PATH = "./data/reminders.json";

export function loadReminders() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveReminders(reminders) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(reminders, null, 2));
}

export function addReminder(reminder) {
  const reminders = loadReminders();
  reminders.push(reminder);
  saveReminders(reminders);
}
