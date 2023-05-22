import { Text, TouchableOpacity, View } from "react-native";

import { DiaryHeader } from "../../components/Diary/DiaryHeader";

import React, { useState } from "react";
import { IDiary, IImage } from "../../interface";
import { DetailedContent } from "../../components/Diary/DetailContent";
import { FontStyle, LayoutStyle } from "../../css/GlobalStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { ShareModal } from "../../components/Diary/addModal/ShareModal";

interface Props {
  diary: IDiary;
}

export const DetailedPage = ({ route, navigation }) => {
  const { diary } = route.params;
  const [shareVisible, setShareVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ShareModal
        visible={shareVisible}
        setVisible={setShareVisible}
        diary={diary}
      />
      <View
        style={{
          marginTop: 10,
          justifyContent: "center",
          ...LayoutStyle.rowCenter,
        }}
      >
        <TouchableOpacity
          style={{
            height: "100%",
            position: "absolute",
            left: 5,
            ...LayoutStyle.rowCenter,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back-outline" size={25}></Ionicons>
          <Text>{"返回"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: "100%",
            position: "absolute",
            right: 10,
            ...LayoutStyle.rowCenter,
          }}
          onPress={() => {
            // navigation.goBack();
            setShareVisible(true);
            console.log("post");
          }}
        >
          <Ionicons name="share-social-outline" size={25}></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            ...FontStyle.titleContainer,
          }}
        >
          <Text style={FontStyle.titleText}>{diary.title}</Text>
        </View>
      </View>
      <View
        style={{
          height: "5%",
          marginHorizontal: 30,
          paddingTop: 5,
          ...LayoutStyle.center,
        }}
      >
        <DiaryHeader tags={diary.tag} date={diary.date} />
      </View>
      <DetailedContent content={diary.content} images={diary.images} />
    </View>
  );
};
