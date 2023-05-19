import React, { SetStateAction, useEffect, useState } from "react";
import { AutoFocus, Camera, CameraProps, CameraType } from "expo-camera";
import {
  get_user_self,
  update_userAvatar,
} from "../../../../service/UserService";
import { IUser } from "../../../../interface";
import { Modal, Platform, Pressable, Text } from "react-native";
import { ChangeImageStyle } from "./ChangeInfoStyleSheet";
import { View } from "native-base";
import { ButtonStyle, LayoutStyle } from "../../../../css/GlobalStyleSheet";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  setUser: React.Dispatch<SetStateAction<IUser>>;
}

export const CameraModal = ({ visible, setVisible, setUser }: Props) => {
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = React.useRef<Camera>(null);
  const photoConfig = {
    quality: 1,
    base64: true,
  };

  const permissionFunc = async () => {
    if (!cameraPermission || !(cameraPermission.status === "granted")) {
      await Camera.requestCameraPermissionsAsync();
    }
  };

  useEffect(() => {
    if (Platform.OS === "android" || Platform.OS == "ios")
      permissionFunc().catch((err) => console.error(err));
  }, []);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync(photoConfig);
    console.log(photo);
    update_userAvatar(photo.base64)
      .then(() => get_user_self())
      .then((user) => setUser(user))
      .then(() => setVisible(false))
      .catch((err) => console.error(err));
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
      <Camera
        style={ChangeImageStyle.camera}
        ref={(ref) => (cameraRef.current = ref)}
        type={type}
        autoFocus={AutoFocus.on}
        ratio={"1:1"}
      ></Camera>
      <Pressable style={ButtonStyle.button} onPress={() => handleTakePhoto()}>
        <View style={LayoutStyle.rowCenter}>
          <Ionicons
            style={{ marginRight: 5 }}
            size={15}
            color={"white"}
            name="camera"
          ></Ionicons>
          <Text style={ButtonStyle.text}>{"拍照"}</Text>
        </View>
      </Pressable>
    </Modal>
  );
};
