import React, { useEffect, useState } from "react";
import { Image, Modal, Platform, TouchableOpacity, View } from "react-native";
import { request_album_permission } from "../../../../service/GrantedService";
import { Text } from "@rneui/base";
import ImagePicker from "react-native-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { IUser } from "../../../../interface";
import { update_userinfo } from "../../../../service/UserService";

interface Props {
  usr: IUser;
  setUser: any;
  uri: string;
  visible: boolean;
  setVisible: any;
}
export const ChangeImageInfo = ({
  usr,
  setUser,
  uri,
  visible,
  setVisible,
}: Props) => {
  const [granted, setGranted] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>(uri);
  useEffect(() => {
    if (Platform.OS === "android") {
      request_album_permission(setGranted).catch((err) => console.error(err));
    }
  }, []);

  const options: object = {
    title: "选择图片",
    cancelButtonTitle: "取消",
    takePhotoButtonTitle: "拍照",
    chooseFromLibraryButtonTitle: "相册",
    cameraType: "back",
    mediaType: "photo",
    videoQuality: "high",
    durationLimit: 10,
    maxWidth: 720,
    maxHeight: 1280,
    aspectX: 2,
    aspectY: 1,
    quality: 1,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
      skipBackup: true,
      path: "PickLocalImg", // 存储本地地址
    },
  };

  const handleAddPicCheck = async () => {
    ImagePicker.showImagePicker(options, async (res) => {
      if (res.didCancel) {
        console.log("User cancelled photo picker");
      } else if (res.error) {
        // 用户选择不授权时，提醒以下信息
        console.log("ImagePicker Error: ", res.error);
      } else {
        let source; //保存选中的图片
        if (Platform.OS === "android") {
          source = res.uri;
        } else {
          source = res.uri.replace("file://", "");
        }
        let newUsr: IUser = usr;
        newUsr.avatar = res.fileName; // TODO:file name or source?
        setUser(newUsr);
        await update_userinfo(newUsr).catch((err) => console.log(err));
      }
    });
  };

  if (Platform.OS === "android" && !granted)
    return <Text>{"需要访问相册权限"}</Text>;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View>
        <Text>{"添加图片"}</Text>
        <View>
          {/* 显示上传后的照片 */}
          <Image source={{ uri: avatar }} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAddPicCheck()}
          >
            {/* 点击此图，调用上传图片，一般此图是个➕号 的样子*/}
            <Ionicons name="add-outline"></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
