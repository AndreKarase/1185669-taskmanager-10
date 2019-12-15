import TaskEditComponent from '../components/task-edit.js';
import TaskComponent from '../components/task.js';
import {render, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._mode = Mode.DEFAULT;
    this._onDataChange = onDataChange;
    this._onVewChange = onViewChange;

    this._taskComponent = null;
    this._taskEditComponent = null;
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      replace(this._taskComponent, this._taskEditComponent);
    }
  }

  render(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskComponent(task);
    this._taskEditComponent = new TaskEditComponent(task);

    this._taskComponent.setEditButtonClickHandler(() => {
      this._onVewChange();
      replace(this._taskEditComponent, this._taskComponent);

      this._mode = Mode.EDIT;
    });

    this._taskEditComponent.setSubmitHandler(() => {
      replace(this._taskComponent, this._taskEditComponent);

      this._mode = Mode.DEFAULT;
    });

    this._taskComponent.setArchiveButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive
      }));
    });

    this._taskComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite
      }));
    });

    if (oldTaskComponent && oldTaskEditComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskComponent);
    } else {
      render(this._container, this._taskComponent, `beforeend`);
    }
  }
}

