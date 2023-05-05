import { PermissionsAndroid } from "react-native";

export const request_album_permission = async (setGranted: any) => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
      title: "需要访问相册",
      message: "需要访问相册",
      buttonPositive: "",
    }
  );
  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    setGranted(true);
  } else {
    setGranted(false);
  }
};
