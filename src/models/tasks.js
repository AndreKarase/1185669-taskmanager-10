import {getTasksByFilter} from '../utils/filter.js';

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._activeFilterType = `all`;
    this._filterChangeHandlers = [];
    this._dataChangeHandlers = [];
  }

  getTasks() {
    return getTasksByFilter(this._tasks, this._activeFilterType);
  }

  getTasksAll() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._tasks[index] = task;

    this._dataChangeHandlers.forEach((handler) => handler());
    return true;
  }

  removeTask(id) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._tasks.splice(index, 1);

    this._dataChangeHandlers.forEach((handler) => handler());
  }

  addTask(task) {
    this._tasks.unshift(task);

    this._dataChangeHandlers.forEach((handler) => handler());
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;

    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }
}
