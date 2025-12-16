import PouchDB from 'pouchdb-browser';

// 1. Create Local Database (Works in Browser, Electron, Mobile)
const db = new PouchDB('school_data_local');

// 2. Setup Sync (Remote CouchDB)
// In production, replace with your actual CouchDB/Sync Gateway URL
const remoteDB = new PouchDB('http://admin:password@localhost:5984/school_data_remote');

export const syncData = () => {
  return db.sync(remoteDB, {
    live: true,
    retry: true
  }).on('change', (info) => {
    console.log('Data changed:', info);
  }).on('error', (err) => {
    console.error('Sync error:', err);
  });
};

export default db;