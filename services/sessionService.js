import fs from "fs";

const FILE_PATH = "./data/sessions.json";

function loadSessions() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

function saveSessions(sessions) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(sessions, null, 2));
}

// Save user context (name, last message, etc.)
export function updateSession(psid, data) {
  const sessions = loadSessions();
  sessions[psid] = { ...(sessions[psid] || {}), ...data, lastSeen: new Date().toISOString() };
  saveSessions(sessions);
}

export function getSession(psid) {
  const sessions = loadSessions();
  return sessions[psid] || null;
}
