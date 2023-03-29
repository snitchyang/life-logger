import { diaries } from "../../../data/data";
import { Text, View } from "react-native";
import { DiaryHeader } from "./DiaryHeader";
import { DetailedContent } from "./DiaryContent";
import { diaryStyleSheet } from "./DiaryStyleSheet";
import { Button, color } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";

export const DiaryDetail = ({ diary }) => {
  let date = diary.date;
  let title = diary.title;
  let tags = diary.tag;
  let content = diary.content;
  let imgs = diary.image;
  return (
    <View style={{ flex: 1, minWidth: 350 }}>
      <View style={diaryStyleSheet.detailHeaderWrapper}>
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
      <View style={diaryStyleSheet.detailInfoWrapper}>
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
  return <DiaryDetail diary={diary} />;
}
