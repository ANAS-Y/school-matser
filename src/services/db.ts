// src/services/db.ts
import PouchDB from 'pouchdb-browser';
import PouchFind from 'pouchdb-find';

PouchDB.plugin(PouchFind);

// Create databases
const db = new PouchDB('esrcm_local');

// Setup indexes for fast searching
db.createIndex({
  index: { fields: ['classId', 'type'] }
});

export default db;

// Helper to seed dummy data for testing
export const seedDatabase = async () => {
  try {
    const studentCheck = await db.allDocs({ limit: 1 });
    if (studentCheck.rows.length === 0) {
      await db.post({
        type: 'student',
        name: 'Usman Jalo',
        regNo: '001',
        classId: 'JSS1',
        attendance: { present: 85, absent: 5, total: 90 },
        financial: { totalDue: 50000, totalPaid: 10000, isBlocked: false } // Defaulter
      });
      console.log('Database seeded!');
    }
  } catch (err) {
    console.error(err);
  }
};