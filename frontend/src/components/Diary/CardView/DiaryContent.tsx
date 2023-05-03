import { FlatList, Text, View } from "react-native";
import { DetailImg, DiaryImg } from "./DiaryImg";
import React from "react";
import { IImage } from "../../../interface";

interface IDiaryContent {
  content: string;
  images: IImage[];
}

export const DiaryContent = ({ content, images }: IDiaryContent) => {
  return (
    <View
      id="content"
      style={{
        flex: 6,
        flexDirection: "row",
        minHeight: 100,
      }}
    >
      <View
        style={{
          flex: 4,
          overflow: "hidden",
          marginRight: 10,
        }}
      >
        <Text
          style={{
            marginRight: 20,
            fontSize: 12,
            color: "#000",
          }}
        >
          {" "}
          {content}
        </Text>
      </View>
      {images.length > 0 && <DiaryImg path={images[0].path} />}
    </View>
  );
};

export const DetailedContent = ({ content, images }: IDiaryContent) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 30,
      }}
    >
      <View
        style={{
          maxHeight: 300,
          marginBottom: 30,
          overflow: "hidden",
        }}
      >
        <Text style={{ fontSize: 25 }}>{content}</Text>
      </View>
      <View
        style={{
          flex: 4,
        }}
      >
        <FlatList
          columnWrapperStyle={{
            maxHeight: 130,
            borderColor: "black",
            borderWidth: 3,
          }}
          data={images}
          numColumns={2}
          renderItem={({ item }) => <DetailImg path={item.path} />}
        />
      </View>
    </View>
  );
};
