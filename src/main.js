import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import LoadMoreButtonComponent from './components/load-more-button.js';
import TaskEditComponent from './components/task-edit.js';
import TaskComponent from './components/task.js';
import SiteMenuComponent from './components/site-menu.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render} from './utils.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const renderTask = (task) => {
  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  });

  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  });

  render(taskListElement, taskComponent.getElement(), `beforeend`);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent().getElement(), `beforeend`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(siteMainElement, new FilterComponent(filters).getElement(), `beforeend`);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent.getElement(), `beforeend`);

const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
for (let i = 0; i < showingTasksCount; i++) {
  renderTask(tasks[i]);
}

const loadMoreButtonComponent = new LoadMoreButtonComponent();
render(boardComponent.getElement(), loadMoreButtonComponent.getElement(), `beforeend`);

loadMoreButtonComponent.getElement().addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount += SHOWING_TASKS_COUNT_BY_BUTTON;

  if (showingTasksCount >= tasks.length) {
    showingTasksCount = tasks.length;
    loadMoreButtonComponent.getElement().remove();
    loadMoreButtonComponent.removeElement();
  }

  for (let i = prevTaskCount; i < showingTasksCount; i++) {
    renderTask(tasks[i]);
  }
});

