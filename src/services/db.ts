// src/services/db.ts
// We import everything as an object first
import * as PouchDBRaw from 'pouchdb-browser';
import * as PouchFindRaw from 'pouchdb-find';

// Then we extract the Constructor safely
// @ts-ignore
const PouchDB = PouchDBRaw.default || PouchDBRaw;
// @ts-ignore
const PouchFind = PouchFindRaw.default || PouchFindRaw;

// Register the plugin
PouchDB.plugin(PouchFind);

// Create database
const db = new PouchDB('esrcm_local');

// Setup indexes
db.createIndex({
  index: { fields: ['classId', 'type'] }
}).catch((err: any) => console.log("Index error (safe to ignore):", err));

export default db;

// Seed function remains the same
export const seedDatabase = async () => {
  try {
    const studentCheck = await db.allDocs({ limit: 1 });
    if (studentCheck.rows.length === 0) {
      await db.post({
        type: 'student',
        name: 'Usman Jalo',
        regNo: 'ST/2025/001',
        classId: 'JSS1',
        attendance: { present: 85, absent: 5, total: 90 },
        financial: { totalDue: 50000, totalPaid: 10000, isBlocked: false }
      });
      console.log('Database seeded!');
    }
  } catch (err) {
    console.error("Seeding Error:", err);
  }
};