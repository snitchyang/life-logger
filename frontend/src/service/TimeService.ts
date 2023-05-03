export const getTimeDistance = (date: Date): string => {
  console.log(date);
  const date3 = new Date().getTime() - date.getTime();
  //计算出相差天数
  const days = Math.floor(date3 / (24 * 3600 * 1000));
  if (days !== 0) return days.toString() + " 天前";
  //计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  if (days !== 0) return hours.toString() + " 小时前";
  //计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  if (days !== 0) return minutes.toString() + " 分钟前";
  //计算相差秒数
  const leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  if (days !== 0) return seconds.toString() + " 秒前";
};
