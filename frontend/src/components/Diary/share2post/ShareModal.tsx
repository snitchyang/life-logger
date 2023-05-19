import { IDiary } from "../../../interface";
import { FlatList, Modal, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FontStyle } from "../../../css/GlobalStyleSheet";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  diary: IDiary;
}

export const ShareModal = ({ visible, setVisible, diary }: Props) => {
  const [post, setPost] = useState<IDiary>(diary);
  const [postTitle, setPostTitle] = useState<string>(diary.title);
  const [postContent, setPostContent] = useState<string>(diary.content);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={FontStyle.titleContainer}>
        <Text style={FontStyle.titleText}>{"分享日记"}</Text>
      </View>
      <View>
        <TextInput
          multiline
          value={postTitle}
          onChangeText={(text) => setPostTitle(text)}
        ></TextInput>
      </View>
      <View>
        <TextInput
          multiline
          value={postContent}
          onChangeText={(text) => setPostContent(text)}
        ></TextInput>
      </View>
      <View>{/*<FlatList data={diary.images} renderItem={}/>*/}</View>
    </Modal>
  );
};

// TODO: temporary post image?
