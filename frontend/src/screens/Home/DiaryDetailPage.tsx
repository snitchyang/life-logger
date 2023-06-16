import { Text, TouchableOpacity, View } from "react-native";

import { DiaryHeader } from "../../components/Diary/DiaryHeader";

import React, { useState } from "react";
import { IDiary, IImage } from "../../interface";
import { DetailedContent } from "../../components/Diary/DetailContent";
import { FontStyle, LayoutStyle } from "../../css/GlobalStyleSheet";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ShareModal } from "../../components/Diary/addModal/ShareModal";
import { Divider } from "@rneui/themed";
import { AddDiaryModal } from "../../components/Diary/addModal/AddDiaryModal";
import { ChangeDiaryModal } from "../../components/Diary/addModal/ChangeDiaryModal";

interface Props {
  diary: IDiary;
}

export const DetailedPage = ({ route, navigation }) => {
  const { diary } = route.params;
  const [shareVisible, setShareVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <ShareModal
        visible={shareVisible}
        setVisible={setShareVisible}
        diary={diary}
      />
      {/*<ChangeDiaryModal*/}
      {/*  visible={addVisible}*/}
      {/*  setVisible={setAddVisible}*/}
      {/*  diary_proto={diary}*/}
      {/*/>*/}
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
        {/*<TouchableOpacity*/}
        {/*  style={{*/}
        {/*    height: "100%",*/}
        {/*    position: "absolute",*/}
        {/*    right: 60,*/}
        {/*    ...LayoutStyle.rowCenter,*/}
        {/*  }}*/}
        {/*  onPress={() => {*/}
        {/*    setAddVisible(true);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <MaterialIcons name={"edit"} size={25} />*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          style={{
            height: "100%",
            position: "absolute",
            right: 10,
            ...LayoutStyle.rowCenter,
          }}
          onPress={() => {
            setShareVisible(true);
          }}
        >
          <Ionicons name="share-social-outline" size={25}></Ionicons>
        </TouchableOpacity>
        <View
          style={{
            paddingBottom: 10,
            ...FontStyle.titleContainer,
          }}
        >
          <Text style={FontStyle.titleText}>{diary.title}</Text>
        </View>
      </View>
      <Divider></Divider>
      <View
        style={{
          marginHorizontal: 30,
          paddingTop: 5,
          ...LayoutStyle.center,
        }}
      >
        <DiaryHeader tags={diary.tag} date={diary.begin} />
      </View>
      <DetailedContent content={diary.content} images={diary.images} />
    </View>
  );
};
