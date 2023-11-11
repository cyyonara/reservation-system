export const getLastDayOfMonth = (currentDate: Date): number => {
  const dt = new Date(currentDate);
  dt.setMonth(dt.getMonth() + 1);
  dt.setDate(1);
  dt.setDate(dt.getDate() - 1);
  return dt.getDate();
};
