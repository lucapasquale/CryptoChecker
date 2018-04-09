import * as later from 'later';

import { startDB, Database } from './db';
import cronJobs from './cron-jobs';


start();

async function start() {
  const db = await startDB();

  cronJobs.map(({ handler, interval }) => {
    later.setInterval(() => executeCron(handler, db), later.parse.text(interval));
  });

  console.log('Program Started!');
}

function executeCron(handler: Function, db: Database) {
  try {
    handler(db);
  } catch (e) {
    console.error(e);
  }
}
