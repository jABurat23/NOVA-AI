import { useEffect, useState } from "react";
import axios from "axios";

export default function Conversations() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/conversations").then(res => {
      setLogs(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">💬 Recent Conversations</h2>

      <div className="bg-white shadow rounded-lg p-4 h-[500px] overflow-y-auto space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-3 rounded-lg ${
              log.role === "bot" ? "bg-blue-50 text-blue-800 self-end" : "bg-gray-100 text-gray-800"
            }`}
          >
            <div className="text-sm font-semibold">
              {log.role === "bot" ? "🤖 Bot" : "👤 User"} ({log.sender_psid})
            </div>
            <div className="text-base">{log.message}</div>
            <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
