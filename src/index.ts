import * as later from 'later';

import { startDB, Database } from './db';
import cronjobs from './cron-jobs';


start();

async function start() {
  const db = await startDB();

  cronjobs.map(({ handler, interval }) => {
    later.setInterval(() => executeCron(handler, db), later.parse.text(interval));
  });
}

function executeCron(handler: Function, db: Database) {
  try {
    handler(db);
  }
  catch (e) {
    console.error(e);
  }
}
