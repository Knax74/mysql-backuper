# mysql-backuper v1

**mysql-backuper** is a simple script that creates backups from you MySql-Database.

To do it at a special time you can use `node-schedule`
```js
schedule.scheduleJob("0 0 * * *", () => {     // Every day at 00:00
    createBackup();
});
```

Or just

```js
createBackup();
```
