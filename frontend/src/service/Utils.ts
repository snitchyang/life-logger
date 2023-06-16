export const debounce = (fn, delay = 500) => {
  let timeId = null;
  return function (inputValue: any) {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};

export const parseDateFormat = (date: Date): Date => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  return new Date(year, month, day, hour, min);
};
