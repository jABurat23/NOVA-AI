import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Commands from "./pages/Commands";
import Conversations from "./pages/Conversations";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="ml-64 p-6 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
