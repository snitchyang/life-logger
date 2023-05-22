import dayjs from "dayjs";

const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(timezone);
dayjs.extend(utc);
const tz = "Asia/Shanghai";
export const getTimeDistance = (date: Date): string => {
  const now = new Date();
  const format = dayjs(
    dayjs(
      new Date().setHours(now.getHours() + now.getTimezoneOffset() / 60)
    ).diff(date)
  );

  if (dayjs(date).year() !== dayjs(new Date()).year()) {
    return dayjs(date).format("YYYY-MM-DD");
  }
  if (format.date() > 3) {
    return dayjs(date).format("MM-DD");
  }
  if (format.date() > 1) {
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
  return "刚刚";
};
