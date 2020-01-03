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
  const getCounts = () => {
    const result = {
      all: tasks.length,
      overdue: 0,
      today: 0,
      favorites: 0,
      repeating: 0,
      tags: 0,
      archive: 0
    };

    tasks.forEach((task) => {
      if (task.dueDate instanceof Date &&
        task.dueDate < Date.now()) {
        result.overdue++;
      }
      const today = new Date();
      if (task.dueDate instanceof Date &&
        task.dueDate.getDate() === today.getDate() &&
        task.dueDate.getMonth() === today.getMonth() &&
        task.dueDate.getFullYear() === today.getFullYear()) {
        result.today++;
      }
      if (task.isFavorite) {
        result.favorites++;
      }
      if (Object.values(task.repeatingDays).some((it) => it)) {
        result.repeating++;
      }
      if (task.tags.size !== 0) {
        result.tags++;
      }
      if (task.isArchive) {
        result.archive++;
      }
    });

    return result;
  };

  const counts = getCounts(tasks);

  return filterNames.map((it) => {
    return {
      name: it,
      count: counts[it],
    };
  });
};

export {generateFilters};
