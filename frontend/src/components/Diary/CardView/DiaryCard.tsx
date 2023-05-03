import { DiaryHeader } from "./DiaryHeader";
import { DiaryContent } from "./DiaryContent";

import { View } from "react-native";
import { Card } from "@rneui/base";
import React from "react";
import { IDiary } from "../../../interface";

interface Props {
  diary: IDiary;
}

export const DiaryCard = ({ diary }: Props): JSX.Element => {
  return (
    // <View style={diaryStyleSheet.wrapper}>
    <Card wrapperStyle={{ flex: 1, flexDirection: "column" }}>
      <Card.Title style={{ fontSize: 13 }}> {diary.title}</Card.Title>
      {/*<CardDivider />*/}
      <View style={{ flexDirection: "column" }}>
        <DiaryHeader tags={diary.tag} date={diary.date} />
        <DiaryContent content={diary.content} images={diary.images} />
      </View>
    </Card>
    // </View>
  );
};
