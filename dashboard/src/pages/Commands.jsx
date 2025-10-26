import { useState, useEffect } from "react";
import axios from "axios";

export default function Commands() {
  const [commands, setCommands] = useState([]);
  const [newCommand, setNewCommand] = useState({ name: "", code: "" });

  const fetchCommands = async () => {
    const res = await axios.get("http://localhost:3000/api/commands");
    setCommands(res.data);
  };

  const addCommand = async () => {
    if (!newCommand.name || !newCommand.code) return alert("Fill all fields!");
    await axios.post("http://localhost:3000/api/commands", newCommand);
    setNewCommand({ name: "", code: "" });
    fetchCommands();
  };

  const deleteCommand = async (name) => {
    await axios.delete(`http://localhost:3000/api/commands/${name}`);
    fetchCommands();
  };

  useEffect(() => {
    fetchCommands();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">⚙️ Manage Commands</h2>

      <div className="bg-white shadow p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">➕ Add New Command</h3>
        <input
          type="text"
          placeholder="Command name (no slash)"
          className="border p-2 mr-2 rounded"
          value={newCommand.name}
          onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
        />
        <textarea
          placeholder="Command code (JS)"
          className="border p-2 rounded w-full mt-2 h-32"
          value={newCommand.code}
          onChange={(e) => setNewCommand({ ...newCommand, code: e.target.value })}
        />
        <button
          onClick={addCommand}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        >
          Add Command
        </button>
      </div>

      <div className="bg-white shadow p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Existing Commands</h3>
        {commands.length === 0 ? (
          <p>No commands found.</p>
        ) : (
          <ul className="space-y-2">
            {commands.map((cmd) => (
              <li
                key={cmd}
                className="flex justify-between items-center border-b py-2"
              >
                <span>/{cmd}</span>
                <button
                  onClick={() => deleteCommand(cmd)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
