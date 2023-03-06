import { FlatList, Image, Text, View } from "react-native";
import { diaryStyleSheet } from "./DiaryStyleSheet";
import { ITag } from "../../../interface";
import { DiaryHeader } from "./DiaryHeader";
import { DetailImg, DiaryImg } from "./DiaryImg";

interface DiaryContent {
  content: string;
  images: string[];
}

export const DiaryContent = ({ content, images }: DiaryContent) => {
  return (
    <View id="content" style={diaryStyleSheet.contentWrapper}>
      <View style={diaryStyleSheet.contentTextWrapper}>
        <Text style={diaryStyleSheet.contentText}> {content}</Text>
      </View>
      <DiaryImg img={images[0]} />
    </View>
  );
};

export const DetailedContent = ({ content, images }: DiaryContent) => {
  console.log(images[0]);
  return (
    <View style={diaryStyleSheet.detailContentWrapper}>
      <View style={diaryStyleSheet.detailContentContainer}>
        <Text style={{ fontSize: 25 }}>{content}</Text>
      </View>
      <View style={diaryStyleSheet.detailImgContainer}>
        <FlatList
          columnWrapperStyle={{ maxHeight: 130 }}
          data={images}
          numColumns={2}
          renderItem={({ item }) => <DetailImg img={item} />}
        />
      </View>
    </View>
  );
};
