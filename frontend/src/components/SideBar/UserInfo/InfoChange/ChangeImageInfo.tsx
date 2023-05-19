import React, { useEffect, useState } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "@rneui/themed";
import { IUser } from "../../../../interface";
import {
  get_user_self,
  update_userAvatar,
} from "../../../../service/UserService";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {
  ButtonStyle,
  FontStyle,
  LayoutStyle,
} from "../../../../css/GlobalStyleSheet";
import { CameraModal } from "./CameraModal";

interface Props {
  navigation: any;
  usr: IUser;
  setUser: any;
}

export const ChangeImageInfo = ({ navigation, usr, setUser }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectFromAlbum, setSelectFromAlbum] = useState<boolean>(false);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    ImagePicker.useCameraPermissions();

  const permissionFunc = async () => {
    if (!galleryPermission || !(galleryPermission.status === "granted"))
      await ImagePicker.getMediaLibraryPermissionsAsync();
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
      if (result.canceled) return;
      try {
        update_userAvatar(result.assets[0].base64)
          .then(() => get_user_self())
          .then((res) => setUser(res));
      } catch (e) {
        console.error(e);
      }
    });
  };
  return (
    <View>
      <CameraModal
        visible={modalVisible}
        setVisible={setModalVisible}
        setUser={setUser}
      />
      <View style={FontStyle.titleContainer}>
        <Text style={FontStyle.titleText}>{"头像详情"}</Text>
      </View>
      <View id={"avatar-upload"}>
        {/* 显示上传后的照片 */}
        <Image source={{ uri: usr.avatar }} />
        <View
          style={{
            marginVertical: 50,
            ...LayoutStyle.center,
          }}
        >
          <Avatar size={300} source={{ uri: usr.avatar }} />
        </View>
      </View>
      {/*<Button onPress={setVisible(false)}>{"取消"}</Button>*/}
      <View
        style={{
          minWidth: "80%",
          ...LayoutStyle.rowCenter,
        }}
      >
        <TouchableOpacity
          style={{
            // width: "50%",
            marginHorizontal: 10,
            ...ButtonStyle.button,
          }}
          activeOpacity={0.8}
          onPress={() => handleAddPicCheck()}
        >
          <Text style={ButtonStyle.text}>{"相册"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // width: "50%",
            marginHorizontal: 10,
            ...ButtonStyle.button,
          }}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Text style={ButtonStyle.text}>{"相机"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            // width: "50%",
            marginHorizontal: 10,
            ...ButtonStyle.button,
          }}
          onPress={() => {
            console.log("goback!");
            navigation.goBack();
          }}
        >
          <Text style={ButtonStyle.text}>{"取消"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
