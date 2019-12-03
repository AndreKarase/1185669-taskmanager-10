
const filterNames = [
  `all`,
  `overdue`,
  `today`,
  `favorites`,
  `repeating`,
  `tags`,
  `archive`
];

const generateFilters = (tasks) => {
  const getCount = (filter) => {
    let count = 0;

    switch (filter) {
      case `all`:
        return tasks.length;

      case `overdue`:
        tasks.forEach((task) => {
          if (task.dueDate instanceof Date &&
            task.dueDate < Date.now()) {
            count++;
          }
        });
        break;

      case `today`:
        tasks.forEach((task) => {
          if (task.dueDate instanceof Date &&
            task.dueDate.getDate() === new Date().getDate()) {
            count++;
          }
        });
        break;

      case `favorites`:
        tasks.forEach((task) => {
          if (task.isFavorite) {
            count++;
          }
        });
        break;

      case `repeating`:
        tasks.forEach((task) => {
          if (Object.values(task.repeatingDays).some((it) => it)) {
            count++;
          }
        });
        break;

      case `tags`:
        tasks.forEach((task) => {
          if (Array.from(task.tags).length !== 0) {
            count++;
          }
        });
        break;

      case `archive`:
        tasks.forEach((task) => {
          if (task.isArchive) {
            count++;
          }
        });
        break;

    }

    return count;
  };

  return filterNames.map((it) => {
    return {
      name: it,
      count: getCount(it),
    };
  });
};

export {generateFilters};
