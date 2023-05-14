import { PermissionsAndroid } from "react-native";

export const request_album_permission = async (setGranted: any) => {
  // try {
  //   const granted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //     {
  //       buttonPositive: "",
  //       title: "获取读写照片权限",
  //       message: "上传照片",
  //     }
  //   );
  //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     setGranted(true);
  //   } else setGranted(false);
  // } catch (e) {
  //   console.error(e.toString());
  // }
};
