// src/types.ts

export interface Student {
  _id: string;
  name: string;
  regNo: string;
  classId: string;
  passportUrl?: string;
  attendance: {
    present: number;
    absent: number;
    total: number;
  };
  financial: {
    totalDue: number;
    totalPaid: number;
    isBlocked: boolean; // For Result Withholding
  };
}

// This is the part that was missing or causing the error
export interface Result {
  _id: string; // format: result_studentId_termId_subjectId
  studentId: string;
  subjectId: string;
  scores: {
    ca1?: number;
    ca2?: number;
    exam?: number;
  };
  total: number;
  grade: string;
  remark: string;
  teacherComment?: string; // AI or Manual
  isLocked: boolean;
}

// The Knowledge Base Rules Structure
export interface GradingRule {
  min: number;
  max: number;
  grade: string;
  remark: string;
}

export const WAEC_GRADING: GradingRule[] = [
  { min: 75, max: 100, grade: 'A1', remark: 'Excellent' },
  { min: 70, max: 74, grade: 'B2', remark: 'Very Good' },
  { min: 65, max: 69, grade: 'B3', remark: 'Good' },
  { min: 60, max: 64, grade: 'C4', remark: 'Credit' },
  { min: 55, max: 59, grade: 'C5', remark: 'Credit' },
  { min: 50, max: 54, grade: 'C6', remark: 'Credit' },
  { min: 45, max: 49, grade: 'D7', remark: 'Pass' },
  { min: 40, max: 44, grade: 'E8', remark: 'Pass' },
  { min: 0, max: 39, grade: 'F9', remark: 'Fail' },
];