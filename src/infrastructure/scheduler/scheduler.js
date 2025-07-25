import cron from "node-cron";

class Scheduler {
  constructor() {
    this.tasks = new Map(); // Store tasks with their identifiers
  }

  // Method to run all scheduled tasks
  runTasks() {
    this.tasks.forEach((task) => {
      task.start(); // Start each task
    });
  }

  // Method to add a new task
  addTask(id, cronExpression, callback) {
    if (this.tasks.has(id)) {
      throw new Error(`Task with id ${id} already exists.`);
    }
    const task = cron.schedule(cronExpression, callback);
    this.tasks.set(id, task);
    return task;
  }

  // Method to remove a task by its identifier
  removeTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      task.stop(); // Stop the task before removing
      this.tasks.delete(id); // Remove from the map
    } else {
      throw new Error(`Task with id ${id} does not exist.`);
    }
  }

  // Method to stop a specific task
  stopTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      task.stop();
    } else {
      throw new Error(`Task with id ${id} does not exist.`);
    }
  }

  // Method to start a specific task
  startTask(id) {
    const task = this.tasks.get(id);
    if (task) {
      task.start();
    } else {
      throw new Error(`Task with id ${id} does not exist.`);
    }
  }
}

export const scheduler = new Scheduler();
