import { DiaryHeader } from "./DiaryHeader";
import { DiaryContent } from "./DiaryContent";
import { Card } from "@rneui/base";
import React from "react";
import { IDiary } from "../../../interface";

interface Props {
  diary: IDiary;
}

export const DiaryCard = ({ diary }: Props): JSX.Element => {
  return (
    <Card wrapperStyle={{ width: "100%" }}>
      <Card.Title style={{ fontSize: 13 }}> {diary.title}</Card.Title>
      {/*<CardDivider />*/}
      {/*<View style={{ flexDirection: "column" }}>*/}
      <DiaryHeader tags={diary.tag} date={diary.date} />
      <DiaryContent content={diary.content} images={diary.images} />
      {/*</View>*/}
    </Card>
  );
};
