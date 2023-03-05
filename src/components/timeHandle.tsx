import moment from "moment";

export function timeToNowChinese(past: Date): string {
  let ans: string = moment(past).toNow(true);
  ans = ans.replace("a few seconds", "1 分钟");
  ans = ans.replace("seconds", "秒");
  ans = ans.replace("minutes", "分钟");
  ans = ans.replace("a minute", "1 分钟");
  ans = ans.replace("hours", "小时");
  ans = ans.replace("an hour", "1 小时");
  ans = ans.replace("days", "天");
  ans = ans.replace("a day", "1 天");
  ans = ans.replace("months", "月");
  ans = ans.replace("a month", "1 月");
  ans = ans.replace("years", "年");
  ans = ans.replace("a year", "1 年");
  return ans;
}
