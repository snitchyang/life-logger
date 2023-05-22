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
    <Card wrapperStyle={{}}>
      <Card.Title style={{ fontSize: 13 }}> {diary.title}</Card.Title>
      <DiaryHeader tags={diary.tag} date={diary.begin} />
      <DiaryContent content={diary.content} images={diary.images} />
    </Card>
  );
};
