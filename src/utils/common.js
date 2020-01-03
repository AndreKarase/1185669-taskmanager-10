export const isRepeting = (repeatingDays) => {
  return Object.values(repeatingDays).some((it) => it);
};

export const isOverdue = (dueDate) => {
  if (!dueDate) {
    return false;
  }

  return dueDate < Date.now();
};

export const isToday = (dueDate) => {
  if (!dueDate) {
    return false;
  }

  const today = new Date();
  const result = dueDate.getDate() === today.getDate() &&
    dueDate.getMonth() === today.getMonth() &&
    dueDate.getFullYear() === today.getFullYear();

  return result;
};
