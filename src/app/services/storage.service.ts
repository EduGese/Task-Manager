import { SQLiteDBConnection } from '@capacitor-community/sqlite';
     import { Injectable} from '@angular/core';
     import { SQLiteService } from './sqlite.service';
     import { DbnameVersionService } from './dbname-version.service';
     import { TaskUpgradeStatements } from '../upgrades/task.upgrade.statements';
     import { Task } from '../models/task';
     import { BehaviorSubject, Observable } from 'rxjs';

     @Injectable()
     export class StorageService {
       public taskList: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
         []
       );
       private databaseName: string = '';
       private tUpdStmts: TaskUpgradeStatements = new TaskUpgradeStatements();
       private versionUpgrades;
       private loadToVersion;
       private db!: SQLiteDBConnection;
       private isTaskReady: BehaviorSubject<boolean> = new BehaviorSubject(
         false
       );

       constructor(
         private sqliteService: SQLiteService,
         private dbVerService: DbnameVersionService
       ) {
         this.versionUpgrades = this.tUpdStmts.taskUpgrades;
         this.loadToVersion =
           this.versionUpgrades[this.versionUpgrades.length - 1].toVersion;
       }
       async initializeDatabase(dbName: string) {
         this.databaseName = dbName;
         // create upgrade statements
         await this.sqliteService.addUpgradeStatement({
           database: this.databaseName,
           upgrade: this.versionUpgrades,
         });
         // create and/or open the database
         this.db = await this.sqliteService.openDatabase(
           this.databaseName,
           false,
           'no-encryption',
           this.loadToVersion,
           false
         );
         this.dbVerService.set(this.databaseName, this.loadToVersion);

         await this.getTasks();
       }
       // Current database state
       taskState() {
         return this.isTaskReady.asObservable();
       }

       fetchTasks(): Observable<Task[]> {
         return this.taskList.asObservable();
       }

       async loadTasks() {
         const tasks: Task[] = (await this.db.query('SELECT * FROM tasks;'))
           .values as Task[];
         this.taskList.next(tasks);
       }
       // CRUD Operations

       async getTasks() {
         await this.loadTasks();
         this.isTaskReady.next(true);
       }

       async addTask(
         name: string,
         description: string,
         priority: string,
         tag: string,
         creation_date: string,
         due_date: string
       ) {
         const sql = `INSERT INTO tasks (name, description, priority, tag, creation_date, due_date) VALUES (?, ?, ?, ?, ?, ?);`;
         await this.db.run(sql, [
           name,
           description,
           priority,
           tag,
           creation_date,
           due_date,
         ]);
         await this.getTasks();
       }

       async updateTaskById(
         id: string,
         name: string,
         description: string,
         priority: string,
         tag: string,
         due_date: string
       ) {
         try {
           const sql = `UPDATE tasks SET name = ?, description = ?, priority = ?, tag = ?, due_date = ? WHERE id = ?`;
           const params = [name, description, priority, tag, due_date, id];
           await this.db.run(sql, params);
           await this.getTasks();
         } catch (error) {
           console.error('Error updating task:', error);
         }
       }

       async deleteTaskById(id: string) {
         const sql = `DELETE FROM tasks WHERE id=${id}`;
         await this.db.run(sql);
         await this.getTasks();
       }
       async deleteCompletedTasks() {
         const sql = `DELETE FROM tasks WHERE done=${1}`;
         await this.db.run(sql);
         await this.getTasks();
       }

       async updateTaskStatusById(id: string, done: boolean) {
         let status;
         if (done) {
           status = 1;
         } else {
           status = 0;
         }
         const sql = `UPDATE tasks SET done=${status} WHERE id=${id}`;
         await this.db.run(sql);
         await this.getTasks();
       }
     }