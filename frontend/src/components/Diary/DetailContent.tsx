import { FlatList, Text, View } from "react-native";
import { DetailImg } from "./DiaryImg";
import React from "react";
import { IImage } from "../../interface";
import { OpenImageList } from "../Image/OpenImageList";

interface Props {
  content: string;
  images: IImage[];
}

export const DetailedContent = ({ content, images }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 30,
        // borderWidth: 1,
      }}
    >
      <View
        style={{
          maxHeight: 300,
          marginBottom: 30,
          overflow: "hidden",
        }}
      >
        <Text style={{ fontSize: 20 }}>{content}</Text>
      </View>
      <View
        style={{
          flex: 4,
        }}
      >
        <OpenImageList urls={images.map((item) => item.path)} />
      </View>
    </View>
  );
};
