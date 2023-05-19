import { FlatList, Pressable, Text } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { SetStateAction } from "react";
import { View } from "@ant-design/react-native";
import { ChangeImageInfo } from "./ChangeImageInfo";
import { ChangeImageStyle } from "./ChangeInfoStyleSheet";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  setSelectFromAlbum: React.Dispatch<SetStateAction<boolean>>;
  setSelectFromCamera: React.Dispatch<SetStateAction<boolean>>;
}

export const BottomModal = ({
  visible,
  setVisible,
  setSelectFromAlbum,
  setSelectFromCamera,
}: Props) => {
  return (
    <Modal
      isVisible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={ChangeImageStyle.modalContainer}>
        <Pressable
          style={ChangeImageStyle.modalEntry}
          onPress={() => {
            setSelectFromAlbum(true);
            setSelectFromCamera(false);
          }}
        >
          <Text>{"从相册导入"}</Text>
        </Pressable>
        <Pressable
          style={ChangeImageStyle.modalEntry}
          onPress={() => {
            setSelectFromAlbum(false);
            setSelectFromCamera(true);
          }}
        >
          <Text>{"从相机导入"}</Text>
        </Pressable>
      </View>
    </Modal>
  );
};
