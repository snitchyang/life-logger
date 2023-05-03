import { FlatList, Text, View } from "react-native";
import { DetailImg, DiaryImg } from "./DiaryImg";
import React from "react";

interface DiaryContent {
  content: string;
  images: string[];
}

export const DiaryContent = ({ content, images }: DiaryContent) => {
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
      <DiaryImg img={images[0]} />
    </View>
  );
};

export const DetailedContent = ({ content, images }: DiaryContent) => {
  console.log(images[0]);
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
          // borderWidth: 2,
          // borderColor: "black",
        }}
      >
        <FlatList
          columnWrapperStyle={{ maxHeight: 130 }}
          data={images}
          numColumns={2}
          renderItem={({ item }) => <DetailImg img={item} />}
        />
      </View>
    </View>
  );
};
