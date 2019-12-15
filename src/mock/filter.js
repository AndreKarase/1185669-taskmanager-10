import {getCounts} from '../utils/common.js';

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


  const counts = getCounts(tasks);

  return filterNames.map((it) => {
    return {
      name: it,
      count: counts[it],
    };
  });
};

export {generateFilters};
