import LoadMoreButtonComponent from '../components/load-more-button.js';
import TaskEditComponent from '../components/task-edit.js';
import TaskComponent from '../components/task.js';
import {render, remove, replace} from '../utils/render.js';

const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderTask = (task) => {
      const taskComponent = new TaskComponent(task);
      const taskEditComponent = new TaskEditComponent(task);

      taskComponent.setEditButtonClickHandler(() => {
        replace(taskEditComponent, taskComponent);
      });

      taskEditComponent.setSubmitHandler(() => {
        replace(taskComponent, taskEditComponent);
      });

      render(taskListElement, taskComponent, `beforeend`);
    };

    const taskListElement = this._container.querySelector(`.board__tasks`);

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    for (let i = 0; i < showingTasksCount; i++) {
      renderTask(tasks[i]);
    }

    render(this._container, this._loadMoreButtonComponent, `beforeend`);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTaskCount = showingTasksCount;
      showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

      if (showingTasksCount >= tasks.length) {
        showingTasksCount = tasks.length;
        remove(this._loadMoreButtonComponent);
      }

      for (let i = prevTaskCount; i < showingTasksCount; i++) {
        renderTask(tasks[i]);
      }
    });
  }
}
