import { diaryStyleSheet } from "./DiaryStyleSheet";
import { Image, View } from "react-native";

interface DiaryImg {
  img: string;
}

export const DiaryImg = ({ img }: DiaryImg) => {
  return (
    <Image
      style={diaryStyleSheet.contentImg}
      source={require("../../../assets/diaryImage/testPic.jpg")}
      alt="picture"
    />
  );
};

export const DetailImg = ({ img }: DiaryImg) => {
  return (
    <Image
      style={diaryStyleSheet.detailImg}
      source={require("../../../assets/diaryImage/testPic.jpg")}
      alt="picture"
    />
  );
};
