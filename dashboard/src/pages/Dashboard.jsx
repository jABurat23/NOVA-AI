import { useEffect, useState } from "react";
import { getStats } from "../api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📊 Dashboard Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">👥 Active Users</p>
          <p className="text-2xl font-bold">{stats.activeUsers}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">⚙️ Commands</p>
          <p className="text-2xl font-bold">{stats.totalCommands}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">⏱ Uptime</p>
          <p className="text-2xl font-bold">{Math.round(stats.uptime / 60)} mins</p>
        </div>
      </div>
    </div>
  );
}
