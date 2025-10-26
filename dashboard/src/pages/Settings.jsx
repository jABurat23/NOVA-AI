import { useState, useEffect } from "react";
import axios from "axios";

export default function Settings() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/api/settings").then((res) => {
      setSettings(res.data);
    });
  }, []);

  const saveSettings = async () => {
    await axios.post("http://localhost:3000/api/settings", settings);
    alert("Settings saved ✅");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">⚙️ Bot Settings</h2>

      <div className="bg-white shadow p-4 rounded-lg space-y-3">
        <div>
          <label className="block font-semibold">Owner PSID</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={settings.owner_psid || ""}
            onChange={(e) => setSettings({ ...settings, owner_psid: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold">Developer PSID</label>
          <input
            type="text"
            className="border p-2 rounded w-full"
            value={settings.developer_psid || ""}
            onChange={(e) => setSettings({ ...settings, developer_psid: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-semibold">Daily Quote Time</label>
          <input
            type="time"
            className="border p-2 rounded"
            value={settings.daily_quote_time || ""}
            onChange={(e) => setSettings({ ...settings, daily_quote_time: e.target.value })}
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.use_ai || false}
              onChange={(e) => setSettings({ ...settings, use_ai: e.target.checked })}
            />
            <span>Use AI (OpenAI or alternative)</span>
          </label>
        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
