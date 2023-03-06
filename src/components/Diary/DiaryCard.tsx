import { IDiary } from "../../interface";
import { diaryStyleSheet } from "./DiaryStyleSheet";
import { DiaryHeader } from "./DiaryHeader";
import { DiaryContent } from "./DiaryContent";
import { diaries, tags } from "../../data/data";
import { DiaryDetail } from "./DiaryDetail";

import { StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import { DiaryTags } from "./DiaryTags";
import React from "react";

interface DiaryCard {
  id: number;
}

export const DiaryCard = ({ id }: DiaryCard): JSX.Element => {
  let diary = undefined;
  diary = diaries.find((item) => {
    return item.id === id;
  });
  const date = diary.date;
  const title = diary.title;
  const content = diary.content;
  const image = diary.image;
  const tag = diary.tag;
  if (diary !== undefined) {
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
  } else {
    return <></>;
  }
};
