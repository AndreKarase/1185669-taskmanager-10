import BoardComponent from './components/board.js';
import FilterComponent from './components/filter.js';
import SiteMenuComponent from './components/site-menu.js';
import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';
import {render} from './utils/render.js';
import BoardController from "./controllers/board.js";

const TASK_COUNT = 22;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenuComponent(), `beforeend`);

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);
render(siteMainElement, new FilterComponent(filters), `beforeend`);

const boardComponent = new BoardComponent();
render(siteMainElement, boardComponent, `beforeend`);

const boardController = new BoardController(boardComponent);
boardController.render(tasks);
