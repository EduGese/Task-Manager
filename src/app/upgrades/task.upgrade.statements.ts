export class TaskUpgradeStatements {
    taskUpgrades = [
        {
        toVersion: 1,
        statements: [
            `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            active INTEGER DEFAULT 1
            );`
        ]
        },
        /* add new statements below for next database version when required*/
        
        {
        toVersion: 2,
        statements: [
            `CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            priority TEXT NOT NULL,
            tag TEXT NOT NULL,
            done INTEGER DEFAULT 0
            );`,
        ]
        },
        {
        toVersion: 3,
        statements: [
            `ALTER TABLE tasks ADD COLUMN creation_date TEXT NOT NULL;`,
            `ALTER TABLE tasks ADD COLUMN due_date TEXT NOT NULL;`
        ]
        },
        {
            toVersion: 4,
            statements: [
                `ALTER TABLE tasks ADD COLUMN notification_date_range TEXT NOT NULL;`,
                `ALTER TABLE tasks ADD COLUMN notification_date TEXT NOT NULL;`
            ]
            },
        
    ]
}    