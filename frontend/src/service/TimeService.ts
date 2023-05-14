import dayjs from "dayjs";

export const getTimeDistance = (date: Date): string => {
  const format = dayjs(dayjs(new Date()).diff(date));
  if (dayjs(date).year() !== dayjs(new Date()).year()) {
    return dayjs(date).format("YYYY-MM-DD");
  }
  if (format.date() > 3) {
    return dayjs(date).format("MM-DD");
  }
  if (format.date() > 0) {
    return format.date().toString() + " 天前";
  }
  if (format.hour() > 0) {
    return format.hour().toString() + " 小时前";
  }
  if (format.minute() > 0) {
    return format.minute().toString() + " 分钟前";
  }
  if (format.second() > 0) {
    return format.second().toString() + " 秒前";
  }
};
