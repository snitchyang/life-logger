import { DiaryHeader } from "./DiaryHeader";
import { DiaryContent } from "./DiaryContent";
import { Card } from "@rneui/themed";
import React from "react";
import { IDiary } from "../../interface";
import { TouchableOpacity } from "react-native";

interface Props {
  diary: IDiary;
}

export const DiaryCard = ({ diary }: Props) => {
  return (
    <Card wrapperStyle={{ width: "100%", height: "100%" }}>
      <Card.Title style={{ fontSize: 13 }}> {diary.title}</Card.Title>
      <DiaryHeader tags={diary.tags} date={diary.date} />
      <DiaryContent content={diary.content} images={diary.images} />
    </Card>
  );
};
