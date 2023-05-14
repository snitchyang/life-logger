import React, { useEffect, useState } from "react";
import { Image, Modal, Platform, TouchableOpacity, View } from "react-native";
import { request_album_permission } from "../../../../service/GrantedService";
import { Button, Text } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { IUser } from "../../../../interface";
import { update_userinfo } from "../../../../service/UserService";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

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
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [galleryPermission, setGalleryPermission] = useState<boolean>(false);

  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState<string>(usr.avatar);

  const permissionFunc = async () => {
    let cameraPermission, imagePermission;
    if (!cameraPermission) {
      cameraPermission = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraPermission.status === "granted");
      // if (cameraPermission.status !== "granted")
      //   console.info("no camera permission");
    }
    if (!galleryPermission) {
      imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
      setGalleryPermission(imagePermission.status === "granted");
      // if (imagePermission.status !== "granted") console.info("no permission");
    }
  };

  useEffect(() => {
    if (Platform.OS === "android" && !galleryPermission) {
      permissionFunc().catch((err) => console.error(err));
    }
  }, []);

  const handleAddPicCheck = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    }).then((result) => {
      if (!result.canceled) {
        console.log("pick image");
        try {
          // result.assets[0].base64
          setImage(result.assets[0].uri);
          let newUsr = usr;
          newUsr.avatar = image;
          // setUser(newUsr);
          update_userinfo(usr, result.assets[0].base64).catch((err) =>
            console.error(err)
          );
        } catch (e) {
          console.error(e);
        }
      } else console.log("cancel");
    });
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View>
        <Text>{"添加图片"}</Text>
        <View id={"avatar-upload"}>
          {/* 显示上传后的照片 */}
          <Image source={{ uri: image }} />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleAddPicCheck()}
          >
            {/* 点击此图，调用上传图片，一般此图是个➕号 的样子*/}
            <Ionicons name="add-outline" size={30}></Ionicons>
          </TouchableOpacity>
        </View>
        {/*<Button onPress={setVisible(false)}>{"取消"}</Button>*/}
      </View>
    </Modal>
  );
};
