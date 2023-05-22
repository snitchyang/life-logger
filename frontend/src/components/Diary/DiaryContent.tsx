import { FlatList, Text, View } from "react-native";
import { DetailImg, DiaryImg } from "./DiaryImg";
import React from "react";
import { IImage } from "../../interface";

interface Props {
  content: string;
  images: IImage[];
}

export const DiaryContent = ({ content, images }: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        paddingBottom: 10,
      }}
    >
      <View
        style={{
          flex: 2,
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            paddingRight: 20,
            fontSize: 12,
            color: "#000",
          }}
        >
          {" "}
          {content}
        </Text>
      </View>
      {images.length > 0 && <DiaryImg url={images[0].path} />}
    </View>
  );
};
