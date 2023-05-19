import React, { SetStateAction, useEffect, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "@rneui/base";
import { IUser } from "../../../../interface";
import {
  get_user_self,
  update_user_avatar,
  update_userinfo,
} from "../../../../service/UserService";
import { AutoFocus, Camera, CameraProps, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {
  ButtonStyle,
  LayoutStyle,
  TextStyle,
} from "../../../../css/GlobalStyleSheet";
import { ChangeImageStyle } from "./ChangeInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { BottomModal } from "./BottomModal";

interface Props {
  usr: IUser;
  setUser: any;
}

export const ChangeImageInfo = ({ usr, setUser }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectFromAlbum, setSelectFromAlbum] = useState<boolean>(false);
  const [selectFromCamera, setSelectFromCamera] = useState<boolean>(false);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    ImagePicker.useCameraPermissions();

  const permissionFunc = async () => {
    if (!galleryPermission || !(galleryPermission.status === "granted"))
      await ImagePicker.getMediaLibraryPermissionsAsync();
  };

  useEffect(() => {
    if (Platform.OS === "android" || Platform.OS == "ios") {
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
        try {
          update_user_avatar(result.assets[0].base64)
            .then(() => get_user_self())
            .then((user) => {
              setUser(user);
              // console.log(user.avatar);
            });
          // .then(() => setVisible(false));
        } catch (e) {
          console.error(e);
        }
      } else console.log("cancel");
    });
  };

  return (
    <View>
      <BottomModal
        visible={modalVisible}
        setVisible={setModalVisible}
        setSelectFromAlbum={setSelectFromAlbum}
        setSelectFromCamera={setSelectFromCamera}
      ></BottomModal>
      <View
        style={{
          marginTop: 80,
          ...TextStyle.titleContainer,
          ...LayoutStyle.rowCenter,
        }}
      >
        <Text
          style={{
            flex: 9,
            ...TextStyle.titleText,
          }}
        >
          {"头像"}
        </Text>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons size={15} name="ellipsis-horizontal"></Ionicons>
        </TouchableOpacity>
      </View>
      <View style={LayoutStyle.center}>
        {/* 显示上传后的照片 */}
        <View style={LayoutStyle.center}>
          <Avatar
            containerStyle={ChangeImageStyle.avatar}
            size={200}
            source={{ uri: usr.avatar }}
          />
          {/* 点击此图，调用上传图片，一般此图是个➕号 的样子*/}
          {/*<Ionicons name="add-outline" size={50}></Ionicons>*/}
        </View>
      </View>
      <View
        style={{
          minWidth: "80%",
          ...LayoutStyle.center,
        }}
      >
        <Pressable
          style={{
            width: "50%",
            ...ButtonStyle.button,
          }}
          // onPress={() => setVisible(false)}
        >
          <Text style={ButtonStyle.text}>{"取消"}</Text>
        </Pressable>
      </View>
    </View>
  );
};
