import { NotificationsService } from 'src/app/services/notifications/notifications.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';
import { TaskUpgradeStatements } from '../upgrades/task.upgrade.statements';
import { Task } from '../models/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class StorageService {
  public taskList: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  private databaseName: string = '';
  private tUpdStmts: TaskUpgradeStatements = new TaskUpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;
  private isTaskReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService,
    private notificationsService: NotificationsService
  ) {
    this.versionUpgrades = this.tUpdStmts.taskUpgrades;
    this.loadToVersion =
      this.versionUpgrades[this.versionUpgrades.length - 1].toVersion;
  }
  async initializeDatabase(dbName: string) {
    try {
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
    } catch (error) {
      console.error('Error initializing database: ', error);
    }
  }
  // Current database state
  taskState() {
    return this.isTaskReady.asObservable();
  }

  fetchTasks(): Observable<Task[]> {
    return this.taskList.asObservable();
  }

  async getTasks() {
    await this.loadTasks();
    this.isTaskReady.next(true);
  }

  // CRUD OPERATIONS

  async loadTasks() {
    try {
      const tasks: Task[] = (await this.db.query('SELECT * FROM tasks;'))
        .values as Task[];
      this.taskList.next(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async addTask(
    name: string,
    description: string,
    priority: string,
    tag: string,
    creation_date: string,
    due_date: string,
    notification_date_range: string,
    notification_date: string
  ) {
    try {
      const sql = `INSERT INTO tasks (name, description, priority, tag, creation_date, due_date, notification_date_range, notification_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
      const params = [
        name,
        description,
        priority,
        tag,
        creation_date,
        due_date,
        notification_date_range,
        notification_date,
      ];

      const createdTask = await this.db.run(sql, params);
      if (notification_date_range !== '' && createdTask.changes?.lastId) {
        this.notificationsService.scheduleNotificacion(
          createdTask.changes?.lastId,
          notification_date,
          name,
          description,
          notification_date_range
        );
      }
      await this.getTasks();
    } catch (error) {
      console.error('Error adding task', error);
    }
  }

  async updateTaskById(
    id: string,
    name: string,
    description: string,
    priority: string,
    tag: string,
    due_date: string,
    notification_date: string,
    notification_date_range: string
  ) {
    try {
      const sql = `UPDATE tasks SET name = ?, description = ?, priority = ?, tag = ?, due_date = ?, notification_date_range = ?,notification_date = ?  WHERE id = ?`;
      const params = [
        name,
        description,
        priority,
        tag,
        due_date,
        notification_date_range,
        notification_date,
        id,
      ];
      await this.db.run(sql, params);
      if (notification_date_range !== '') {
        this.notificationsService.scheduleNotificacion(
          Number(id),
          notification_date,
          name,
          description,
          notification_date_range
        );
      } else {
        this.notificationsService.cancelNotification(Number(id));
      }
      await this.getTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  async deleteTaskById(id: string) {
    try {
      const sql = `DELETE FROM tasks WHERE id=?`;
      const params = [id];
      await this.db.run(sql, params);
      this.notificationsService.cancelNotification(Number(id));
      await this.getTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  }

  async deleteCompletedTasks() {
    try {
      const sql = `DELETE FROM tasks WHERE done=?`;
      const params = [1];
      await this.db.run(sql, params);
      await this.getTasks();
    } catch (error) {
      console.error('Error deleting completed tasks', error);
    }
  }

  async updateTaskStatusById(task: Task) {
    try {
      const sql = `UPDATE tasks SET done = ?, notification_date_range = ?,notification_date = ?  WHERE id=?`;
      const params = [
        task.done,
        task.notification_date_range,
        task.notification_date,
        task.id,
      ];
      await this.db.run(sql, params);
      if (task.done) {
        this.notificationsService.cancelNotification(task.id);
      }
      await this.getTasks();
    } catch (error) {
      console.error('Error updating task status', error);
    }
  }
}
