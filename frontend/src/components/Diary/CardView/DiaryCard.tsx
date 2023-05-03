import { DiaryHeader } from "./DiaryHeader";
import { DiaryContent } from "./DiaryContent";

import { View } from "react-native";
import { Card } from "@rneui/base";
import React from "react";

export const DiaryCard = ({ diary }): JSX.Element => {
  const date = diary.date;
  const title = diary.title;
  const content = diary.content;
  const image = diary.image;
  const tag = diary.tag;
  return (
    // <View style={diaryStyleSheet.wrapper}>
    <Card wrapperStyle={{ flex: 1, flexDirection: "column" }}>
      <Card.Title style={{ fontSize: 13 }}> {title}</Card.Title>
      {/*<CardDivider />*/}
      <View style={{ flexDirection: "column" }}>
        <DiaryHeader tags={tag} date={date} />
        <DiaryContent content={content} images={image} />
      </View>
    </Card>
    // </View>
  );
};
