export const getFormatedDate = (_date: Date): string => {
  const date = new Date(_date);
  const year = date.getFullYear();
  const month = 1 + date.getMonth();
  const monthString = month >= 10 ? month : `0${month}`;
  const day = date.getDate();
  const dayString = day >= 10 ? day : `0${day}`;

  return `${year}-${monthString}-${dayString}`;
};
