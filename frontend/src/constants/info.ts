import { IDiary } from "../interface";

export const gender_text: string[] = ["male", "female", "unknown"];

export const userinfo_enumerate = {
  changeProfile: 0,
  changeName: 1,
  changeGender: 2,
  changeBio: 3,
  changeSchool: 4,
};

export const emtpy_diary: IDiary = {
  id: 0,
  title: "",
  content: "",
  duration: new Date(),
  date: new Date(),
  images: [],
  tags: [],
};
