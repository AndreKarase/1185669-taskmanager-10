import LoadMoreButtonComponent from '../components/load-more-button.js';
import {render, remove} from '../utils/render.js';
import TaskController, {Mode} from './task.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const EmptyTask = {
  description: ``,
  dueDate: null,
  repeatingDays: {
    'mo': false,
    'tu': false,
    'we': false,
    'th': false,
    'fr': false,
    'sa': false,
    'su': false,
  },
  tags: [],
  color: `black`,
  isFavorite: false,
  isArchive: false,
};
export default class BoardController {
  constructor(container, tasksModel) {
    this._container = container;
    this._tasksModel = tasksModel;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._creatingTask = null;
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadButtonClick = this._onLoadButtonClick.bind(this);
    this._tasksModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const tasks = this._tasksModel.getTasks();

    const taskListElement = this._container.querySelector(`.board__tasks`);

    for (let i = 0; i < this._showingTasksCount; i++) {
      const taskController = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
      this._showedTaskControllers.push(taskController);
      taskController.render(tasks[i], Mode.DEFAULT);
    }

    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount < tasks.length) {
      render(this._container, this._loadMoreButtonComponent, `beforeend`);
      this._loadMoreButtonComponent.setClickHandler(this._onLoadButtonClick);
    }
  }

  _onLoadButtonClick() {
    const tasks = this._tasksModel.getTasks();
    const taskListElement = this._container.querySelector(`.board__tasks`);
    const prevTaskCount = this._showingTasksCount;
    this._showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

    if (this._showingTasksCount >= tasks.length) {
      this._showingTasksCount = tasks.length;
      remove(this._loadMoreButtonComponent);
    }

    for (let i = prevTaskCount; i < this._showingTasksCount; i++) {
      const taskController = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
      this._showedTaskControllers.push(taskController);
      taskController.render(tasks[i], Mode.DEFAULT);
    }
  }

  createTask() {
    if (this._creatingTask) {
      return;
    }

    const taskListElement = this._container.querySelector(`.board__tasks`);
    this._creatingTask = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingTask.render(EmptyTask, Mode.ADDING);
  }

  _removeTasks() {
    const taskListElement = this._container.querySelector(`.board__tasks`);

    taskListElement.innerHTML = ``;
    this._showedTaskControllers = [];
  }

  _onDataChange(taskController, oldData, newData) {
    if (oldData === EmptyTask) {
      debugger
      this._creatingTask = null;
      this._tasksModel.addTask(newData);
      taskController.render(newData, Mode.DEFAULT);

      const destroyedTask = this._showedTaskControllers.pop();
      destroyedTask.destoy();

      this._showedTaskControllers.unshift(taskController);
      this._showingTasksCount = this._showedTaskControllers.length;

    } else if (newData === null) {
      this._tasksModel.removeTask(oldData.id);
      this._removeTasks();
      this.render();

    } else {
      const isSuccess = this._tasksModel.updateTask(oldData.id, newData);

      if (isSuccess) {
        taskController.render(newData, Mode.DEFAULT);
      }
    }
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onFilterChange() {
    this._removeTasks();
    this.render();
  }
}
