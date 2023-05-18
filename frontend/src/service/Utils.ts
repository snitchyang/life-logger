export const debounce = (fn, delay = 500) => {
  let timeId = null;
  return function (inputValue: any) {
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
};
