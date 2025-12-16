// src/services/expertSystem.ts
import { Student, Result, WAEC_GRADING } from '../types';

export const ExpertSystem = {
  
  // 1. Inference Engine: Auto-Grading
  calculateGrade: (score: number) => {
    const rule = WAEC_GRADING.find(r => score >= r.min && score <= r.max);
    return rule ? { grade: rule.grade, remark: rule.remark } : { grade: '?', remark: 'Pending' };
  },

  // 2. Inference Engine: AI Comment Generation
  generateComment: (student: Student, results: Result[]): string => {
    const passedSubjects = results.filter(r => r.total >= 50).length;
    const totalSubjects = results.length;
    const passRate = (passedSubjects / totalSubjects) * 100;
    
    // Knowledge Base: Comment Templates
    if (passRate >= 80) return `An outstanding performance! ${student.name} has shown mastery in most subjects. Keep up the excellent work.`;
    if (passRate >= 50) return `A good attempt, but there is room for improvement. ${student.name} should focus more on weak subjects next term.`;
    if (student.attendance.present < student.attendance.total * 0.7) return `Performance is affected by poor attendance. Regularity is required for better results.`;
    
    return `Below average performance. We recommend a meeting with the parents to discuss a study plan.`;
  },

  // 3. Inference Engine: Financial Policy Enforcer
  checkResultAccess: (student: Student, minThreshold: number = 5000): { allow: boolean, message: string } => {
    const outstanding = student.financial.totalDue - student.financial.totalPaid;
    
    if (outstanding > minThreshold) {
      return { 
        allow: false, 
        message: `Result Withheld. Outstanding balance of ₦${outstanding} exceeds the limit.` 
      };
    }
    return { allow: true, message: 'Access Granted' };
  },

  // 4. Intelligence Center: System Alerts
  generateAlerts: (students: Student[], results: Result[]) => {
    const alerts = [];
    
    // Rule: Check for low data entry completion
    if (results.length < (students.length * 8)) { // Assuming 8 subjects
      alerts.push({ type: 'warning', msg: 'Data Entry Low: Marks entry is behind schedule.' });
    }
    
    // Rule: Financial Health
    const defaulters = students.filter(s => (s.financial.totalDue - s.financial.totalPaid) > 0).length;
    if (defaulters > students.length * 0.4) {
      alerts.push({ type: 'critical', msg: `Financial Critical: ${defaulters} students have outstanding fees.` });
    }

    return alerts;
  }
};