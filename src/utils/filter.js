import {isRepeting, isOverdue, isToday} from './common.js';

export const getArchiveTasks = (tasks) => {
  return tasks.filter((task) => task.isArchive);
};

export const getNotArchiveTasks = (tasks) => {
  return tasks.filter((task) => !task.isArchive);
};

export const getFavoriteTasks = (tasks) => {
  return tasks.filter((task) => task.isFavorite);
};

export const getOverdueTasks = (tasks) => {
  return tasks.filter((task) => {
    if (!task.dueDate) {
      return false;
    }

    return isOverdue(task.dueDate);
  });
};

export const getRepeatingTasks = (tasks) => {
  return tasks.filter((task) => isRepeting(task.repeatingDays));
};

export const getTagsTasks = (tasks) => {
  return tasks.filter((task) => task.tags.size);
};

export const getTodayTasks = (tasks) => {
  return tasks.filter((task) => isToday(task.dueDate));
};


export const getTasksByFilter = (tasks, filterType) => {
  switch (filterType) {
    case `all`:
      return getNotArchiveTasks(tasks);
    case `archive`:
      return getArchiveTasks(tasks);
    case `favorite`:
      return getFavoriteTasks(getNotArchiveTasks(tasks));
    case `overdue`:
      return getOverdueTasks(getNotArchiveTasks(tasks));
    case `repeating`:
      return getRepeatingTasks(getNotArchiveTasks(tasks));
    case `tags`:
      return getTagsTasks(getNotArchiveTasks(tasks));
    case `today`:

      return getTodayTasks(getNotArchiveTasks(tasks));
  }

  return tasks;
};
