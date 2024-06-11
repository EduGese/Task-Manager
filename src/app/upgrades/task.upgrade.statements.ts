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
        
    ]
}    