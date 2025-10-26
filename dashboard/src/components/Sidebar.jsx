import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const links = [
    { path: "/", name: "Dashboard" },
    { path: "/commands", name: "Commands" },
    { path: "/conversations", name: "Conversations" },
    { path: "/settings", name: "Settings" },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-4 fixed">
      <h1 className="text-2xl font-bold mb-6">🤖 AI Dashboard</h1>
      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `block p-2 rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
