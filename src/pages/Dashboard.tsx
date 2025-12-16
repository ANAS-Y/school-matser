// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { ExpertSystem } from '../services/expertSystem';
import db from '../services/db';

const Dashboard = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  
  // Dummy Data for Radar Chart (Result Processing Progress)
  const radarData = [
    { subject: 'CA Entry', A: 100, fullMark: 100 },
    { subject: 'Exams', A: 80, fullMark: 100 },
    { subject: 'Comments', A: 40, fullMark: 100 }, // Low completion
    { subject: 'Affective', A: 90, fullMark: 100 },
    { subject: 'Psychomotor', A: 60, fullMark: 100 },
  ];

  useEffect(() => {
    // Simulate fetching data and running Expert System
    const runSystemCheck = async () => {
      // In real app: const students = await db.find(...)
      const dummyStudents: any[] = [{ financial: { totalDue: 50000, totalPaid: 10000 }}]; 
      const dummyResults: any[] = []; 
      
      const generatedAlerts = ExpertSystem.generateAlerts(dummyStudents, dummyResults);
      setAlerts(generatedAlerts);
    };
    runSystemCheck();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Intelligence Dashboard</h1>
      
      {/* 1. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Result Readiness</p>
              <h2 className="text-2xl font-bold">72%</h2>
            </div>
            <TrendingUp className="text-blue-500" />
          </div>
        </div>
        {/* Add more cards for Revenue, Students, etc. */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 2. Result Processing Radar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4">Result Compilation Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Progress" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. AI Intelligence Center (Alerts) */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-4 flex items-center">
             <AlertTriangle className="mr-2 text-yellow-500" /> AI Intelligence Center
          </h3>
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div key={idx} className={`p-3 rounded-md border ${alert.type === 'critical' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-yellow-50 border-yellow-200 text-yellow-700'}`}>
                <p className="font-medium text-sm">{alert.msg}</p>
                {alert.type === 'critical' && <button className="text-xs underline mt-1">View Defaulters</button>}
              </div>
            ))}
            {alerts.length === 0 && <p className="text-green-600 flex items-center"><CheckCircle className="w-4 h-4 mr-2"/> System Optimal</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;