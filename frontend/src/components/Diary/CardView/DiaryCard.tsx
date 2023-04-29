import { IDiary } from "../../../interface";
import { diaryStyleSheet } from "./DiaryStyleSheet";
import { DiaryHeader } from "./DiaryHeader";
import { DiaryContent } from "./DiaryContent";
import { diaries, tags } from "../../../data/data";
import { DiaryDetailPage } from "../../../screens/Home/DiaryDetailPage";

import { StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import { DiaryTags } from "./DiaryTags";
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
