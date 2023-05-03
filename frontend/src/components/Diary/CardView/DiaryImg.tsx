import React from "react";
import { Image } from "react-native";

interface DiaryImg {
  img: string;
}

export const DiaryImg = ({ img }: DiaryImg) => {
  return (
    <Image
      style={{
        flex: 1,
        paddingLeft: 10,
        marginRight: 20,
        width: "100%",
        height: "100%",
        // width: 100,
        // height: 100,
      }}
      source={require("../../../assets/diaryImage/testPic.jpg")}
      alt="picture"
    />
  );
};

export const DetailImg = ({ img }: DiaryImg) => {
  return (
    <Image
      style={{
        flex: 1,
        width: 100,
        height: 130,
        // marginHorizontal: 10,
      }}
      source={require("../../../assets/diaryImage/testPic.jpg")}
      alt="picture"
    />
  );
};
