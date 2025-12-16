// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MarkEntry from './pages/MarkEntry';
import { seedDatabase } from './services/db';

function App() {
  
  // Seed DB on first load for demo purposes
  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-4 font-bold text-xl">School ESRCM</div>
          <nav className="mt-6">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-700">Dashboard</Link>
            <Link to="/marks" className="block px-4 py-2 hover:bg-gray-700">Mark Entry</Link>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Results</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700 text-red-300">Sync Data</a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/marks" element={<MarkEntry />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;