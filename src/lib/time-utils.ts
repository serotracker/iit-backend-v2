export const dateToMonthCount = (date: Date): number => {
  return (date.getFullYear() * 12) + date.getMonth();
}

export const monthCountToYear = (monthCount: number): number => {
  return Math.floor(monthCount / 12);
}

export const monthCountToMonthNumber = (monthCount: number): number => {
  return monthCount % 12;
}