import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Card } from "@rneui/base";
import { ITag } from "../../../interface";
import { DiaryTags } from "./DiaryTags";
import { DiaryContent } from "./DiaryContent";
import { diaryStyleSheet } from "./DiaryStyleSheet";
import ScrollView = Animated.ScrollView;

interface DiaryHeader {
  tags: ITag[];
  date: Date;
}

export const DiaryHeader = ({ tags, date }: DiaryHeader) => {
  // console.log(new Date().getTime() - new Date(date).getTime());
  return (
    <View style={diaryStyleSheet.headerWrapper}>
      <View style={diaryStyleSheet.tagsWrapper}>
        {tags.map((element, index) => (
          <DiaryTags id={index} tag_name={element.content} />
        ))}
      </View>
      <View style={diaryStyleSheet.dateWrapper}>
        <Text style={diaryStyleSheet.dateText}>
          {new Date().getTime() - new Date(date).getTime()}
        </Text>
      </View>
    </View>
  );
};
