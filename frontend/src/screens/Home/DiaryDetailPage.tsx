import { Text, View } from "react-native";

import { DiaryHeader } from "../../components/Diary/CardView/DiaryHeader";
import { DetailedContent } from "../../components/Diary/CardView/DiaryContent";
import React from "react";

export const DiaryDetailPage = ({ diary }) => {
  let date = diary.date;
  let title = diary.title;
  let tags = diary.tag;
  let content = diary.content;
  let imgs = diary.image;
  return (
    <View style={{ flex: 1, minWidth: 350 }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 30,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          maxHeight: 25,
          marginHorizontal: 30,
          marginTop: 20,
        }}
      >
        <DiaryHeader tags={tags} date={date} />
      </View>
      <View style={{ flex: 9 }}>
        <DetailedContent content={content} images={imgs} />
      </View>
    </View>
  );
};

export function DetailedPage({ route }) {
  const { diary } = route.params;
  return <DiaryDetailPage diary={diary} />;
}
