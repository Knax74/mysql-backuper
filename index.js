const mysqldump = require('mysqldump');
const schedule = require("node-schedule");
const path = require('path');
const moment = require('moment');
require('dotenv').config();
const fs = require("fs");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, BACKUP_PATH } = process.env;

async function createBackup() {
  try {
      const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
      const backupFile = path.join(BACKUP_PATH, `${DB_NAME}_${timestamp}.sql`);
    
      if (!fs.existsSync(BACKUP_PATH)) {
        fs.mkdirSync(BACKUP_PATH, { recursive: true });
      }
    
      await mysqldump({
        connection: {
          host: DB_HOST,
          user: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
        },
        dumpToFile: backupFile,
      });
    
      console.log(`Backup created: ${backupFile}`);
    } catch (error) { 
      console.error('Error creating backup:', error);
    }
}


schedule.scheduleJob("0 0 * * *", () => {     // Every day at 00:00
    createBackup();
});