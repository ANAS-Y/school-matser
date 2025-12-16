// src/pages/MarkEntry.tsx
import React, { useState } from 'react';
import { ExpertSystem } from '../services/expertSystem';

const MarkEntry = () => {
  // Simple state for demo. In prod, fetch student list from DB.
  const [students, setStudents] = useState([
    { id: '1', name: 'Usman Jalo', ca1: 0, exam: 0, total: 0, grade: '' }
  ]);

  const handleScoreChange = (id: string, field: string, value: string) => {
    const numVal = parseInt(value) || 0;
    
    setStudents(prev => prev.map(s => {
      if (s.id !== id) return s;
      
      const updated = { ...s, [field]: numVal };
      // Real-time Calculation
      updated.total = (updated.ca1 || 0) + (updated.exam || 0);
      
      // Call Expert System for Grade
      const analysis = ExpertSystem.calculateGrade(updated.total);
      updated.grade = analysis.grade;
      
      return updated;
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Batch Mark Entry: Mathematics</h2>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CA (30)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam (70)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4">
                  <input 
                    type="number" 
                    className="w-16 border rounded p-1"
                    value={student.ca1} 
                    onChange={(e) => handleScoreChange(student.id, 'ca1', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="number" 
                    className="w-16 border rounded p-1"
                    value={student.exam} 
                    onChange={(e) => handleScoreChange(student.id, 'exam', e.target.value)}
                  />
                </td>
                <td className="px-6 py-4 font-bold">{student.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${student.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {student.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarkEntry;