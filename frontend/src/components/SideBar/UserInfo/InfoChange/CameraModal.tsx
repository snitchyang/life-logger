import React, { SetStateAction, useEffect, useState } from "react";
import { AutoFocus, Camera, CameraType } from "expo-camera";
import {
  get_user_self,
  update_userAvatar,
} from "../../../../service/UserService";
import { IUser } from "../../../../interface";
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ChangeImageStyle } from "./ChangeInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<SetStateAction<boolean>>;
  handlePhotoTaken: (base64_photo: string) => any;
}

export const CameraModal = ({
  visible,
  setVisible,
  handlePhotoTaken,
}: Props) => {
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = React.useRef<Camera>(null);

  const permissionFunc = async () => {
    if (!cameraPermission || !(cameraPermission.status === "granted")) {
      await Camera.requestCameraPermissionsAsync();
    }
  };

  useEffect(() => {
    if (Platform.OS === "android" || Platform.OS === "ios")
      permissionFunc().catch((err) => console.error(err));
  }, []);

  const handleTakePhoto = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({
      quality: 1,
      base64: true,
    });
    // do custom actions
    handlePhotoTaken(photo.base64);
    // setVisible(false);
    // setOuterVisible(false);
    // update_userAvatar(photo.base64)
    //   .then(() => get_user_self())
    //   .then((user) => setUser(user))
    //   .catch((err) => console.error(err));
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
      >
        <TouchableOpacity
          style={styleSheet.leftButton}
          onPress={() => {
            setVisible(false);
          }}
        >
          <Ionicons name="chevron-down" size={50} color={"white"}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styleSheet.rightButton}
          onPress={() => {
            if (type === CameraType.back) setType(CameraType.front);
            else setType(CameraType.back);
          }}
        >
          <Ionicons name="shuffle" size={50} color={"white"}></Ionicons>
        </TouchableOpacity>
        <View style={styleSheet.centerButtonWrapper}>
          <View style={styleSheet.centerButtonContainer}>
            <TouchableOpacity
              style={styleSheet.centerButton}
              onPress={() => handleTakePhoto()}
            >
              <Ionicons size={80} color={"white"} name="ellipse"></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};

const styleSheet = StyleSheet.create({
  bottomPosition: {
    position: "absolute",
    bottom: 40,
  },
  leftButton: {
    width: "15%",
    height: "16%",
    left: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },
  rightButton: {
    width: "15%",
    height: "16%",
    right: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 40,
  },
  centerButtonWrapper: {
    position: "absolute",
    bottom: 50,
    width: "35%",
    height: "15%",
    flex: 1,
    alignItems: "center",
  },
  centerButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  centerButton: {
    height: "75%",
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
