import React, { Text, View } from "react-native";
import { DiaryHeader } from "../../components/Diary/CardView/DiaryHeader";
import { DetailedContent } from "../../components/Diary/CardView/DiaryContent";
import { diaryStyleSheet } from "../../components/Diary/CardView/DiaryStyleSheet";
import { type IDiary } from "../../interface";
import { type Route } from "@react-navigation/native";

interface Props {
  diary: IDiary;
}

export const DiaryDetailPage = ({ diary }: Props): JSX.Element => {
  const date = diary.date;
  const title = diary.title;
  const tags = diary.tag;
  const content = diary.content;
  const imgs = diary.image;
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

interface Prop {
  route: Route<any>;
}

export function DetailedPage({ route }: Prop): JSX.Element {
  const params = route.params;

  if (params !== undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const { diary } = params;
    return <DiaryDetailPage diary={diary} />;
  }
  return <View />;
}
