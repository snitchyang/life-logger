import { ITag } from "../../../interface";
import { diaryStyleSheet } from "./DiaryStyleSheet";
import { Text, View } from "react-native";

interface DiaryTags {
  id: number;
  tag_name: string;
}

export const DiaryTags = ({ id, tag_name }: DiaryTags) => {
  return (
    <View style={diaryStyleSheet.tagsContainer}>
      <Text style={diaryStyleSheet.tagsText}>{"# " + tag_name}</Text>
    </View>
  );
};
