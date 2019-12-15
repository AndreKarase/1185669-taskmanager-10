import LoadMoreButtonComponent from '../components/load-more-button.js';
import {render, remove} from '../utils/render.js';
import {getCounts} from '../utils/common.js';
import TaskController from './task.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container, filterComponent) {
    this._container = container;
    this._tasks = [];
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
    this._showedTaskControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._filterComponent = filterComponent;
  }

  render(tasks) {
    this._tasks = tasks;
    const taskListElement = this._container.querySelector(`.board__tasks`);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    for (let i = 0; i < showingTasksCount; i++) {
      const taskController = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
      this._showedTaskControllers.push(taskController);
      taskController.render(this._tasks[i]);
    }

    render(this._container, this._loadMoreButtonComponent, `beforeend`);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTaskCount = showingTasksCount;
      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      if (showingTasksCount >= this._tasks.length) {
        showingTasksCount = this._tasks.length;
        remove(this._loadMoreButtonComponent);
      }

      for (let i = prevTaskCount; i < showingTasksCount; i++) {
        const taskController = new TaskController(taskListElement, this._onDataChange, this._onViewChange);
        this._showedTaskControllers.push(taskController);
        taskController.render(this._tasks[i]);
      }
    });
  }

  _onDataChange(taskController, oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks[index] = newData;
    taskController.render(newData);

    this._filterComponent._filters.forEach((it) => {
      it.count = getCounts(this._tasks)[it.name];
    });

    this._filterComponent.rerender();
  }

  _onViewChange() {
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }
}
