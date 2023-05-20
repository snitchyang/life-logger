import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Dialog, Divider, Text } from "@rneui/themed";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { AddImageList, AddPost } from "../../service/PostService";
import { OpenImageList } from "../../components/Image/OpenImageList";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { LocationPicker } from "../../components/Location/LocationPicker";
import { IPResponse } from "../../interface";

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  getnewPostList: () => Promise<void>;
}

const amap_host = "https://restapi.amap.com/v3";
const amap_key = "3925351c690b4a56bbbfc5adac5f39e0";
const width = Dimensions.get("window").width;
export const PostAddPage = ({ visible, setVisible, getnewPostList }: Props) => {
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [galleryPermission, setGalleryPermission] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [cancelDialog, setCancelDialog] = useState(false);
  const [doneDisable, setDoneDisable] = useState(text.length === 0);
  const [addLocation, setAddLocation] = useState(false);
  const [location, setLocation] = useState("添加位置");
  const permissionFunc = async () => {
    let cameraPermission, imagePermission;
    if (!cameraPermission) {
      cameraPermission = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraPermission.status === "granted");
    }
    if (!galleryPermission) {
      imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
      setGalleryPermission(imagePermission.status === "granted");
    }
  };
  useEffect(() => {
    if (Platform.OS === "android" && !galleryPermission) {
      permissionFunc().catch((err) => console.error(err));
    }
  }, []);

  async function getLocationByIP() {
    if (addLocation === true) {
      setAddLocation(false);
      setLocation("添加位置");
      return;
    }
    setAddLocation(true);
    return await fetch(`${amap_host}/ip?key=${amap_key}`)
      .then((res) => res.json())
      .then((res: IPResponse) => {
        if (res.city === res.province) setLocation(res.city);
        else setLocation(`${res.province} ${res.city}`);
      });
  }

  const handleAddPicCheck = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
    }).then((result) => {
      if (result.canceled) return;
      try {
        AddImageList(result.assets.map((value) => value.base64))
          .then((res) => setImages(res))
          .then(() => setDoneDisable(false));
      } catch (e) {
        console.error(e);
      }
    });
  };
  return (
    <Modal
      animationType={"slide"}
      visible={visible}
      onTouchCancel={() => setVisible(false)}
    >
      <TouchableOpacity style={{ position: "absolute", top: 10, left: 20 }}>
        <Button
          icon={{ name: "close", color: "black" }}
          color={"rgb(218,218,218)"}
          onPress={() => {
            if (text.length === 0 && images.length === 0) {
              setVisible(false);
              return;
            }
            setCancelDialog(true);
          }}
        >
          <Text style={{ color: "black" }}>{"取消"}</Text>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity style={{ position: "absolute", top: 10, right: 20 }}>
        <Button
          icon={{ name: "done", color: "white" }}
          color={"rgb(0,0,0)"}
          onPress={() => setVisible(false)}
          disabled={doneDisable}
        >
          <Text
            style={{ color: "white" }}
            onPress={async () => {
              await AddPost(images, addLocation ? location : "", text).then(
                async () => {
                  await getnewPostList();
                  setVisible(false);
                  setText("");
                  setImages([]);
                }
              );
            }}
          >
            {"发表"}
          </Text>
        </Button>
      </TouchableOpacity>
      <View
        style={{
          top: 70,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          {/*<Text style={{ fontSize: 20 }}>{"发表帖子"}</Text>*/}
        </View>
        <Pressable style={{ alignItems: "flex-end", marginRight: 40 }}>
          <MaterialIcons
            name="add-a-photo"
            size={26}
            color="black"
            onPress={handleAddPicCheck}
          />
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 80,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <TextInput
          placeholder={"这一刻的想法..."}
          value={text}
          onChangeText={(text) => {
            setText(text);
            if (text.length !== 0) setDoneDisable(false);
          }}
          style={{ marginBottom: 20, fontSize: 16 }}
        />
        <OpenImageList urls={images} />
      </View>
      <View style={{ marginTop: 70, alignItems: "center" }}>
        <Divider style={{ width: "80%" }} insetType={"middle"} />
        <Pressable
          style={{
            flexDirection: "row",
            paddingTop: 10,
            paddingBottom: 10,
            alignItems: "center",
          }}
          onPress={getLocationByIP}
        >
          <Entypo
            name="location-pin"
            size={30}
            color={addLocation ? "green" : "black"}
          />
          <Text
            style={{
              width: "60%",
              color: addLocation ? "green" : "black",
              fontSize: 18,
              marginLeft: 20,
            }}
          >
            {location}
          </Text>
        </Pressable>

        {/*<Divider style={{ width: "70%" }} insetType={"middle"} />*/}
      </View>
      <LocationPicker />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: 50,
        }}
      >
        <Dialog
          isVisible={cancelDialog}
          style={{ alignItems: "center", alignContent: "center" }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16 }}>{"是否保存草稿"}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <Button
              icon={{ name: "close" }}
              color={"rgb(218,218,218)"}
              onPress={() => {
                setVisible(false);
                setCancelDialog(false);
                setText("");
                setImages([]);
              }}
            ></Button>
            <Button
              icon={{ name: "done", color: "white" }}
              color={"rgb(0,0,0)"}
              onPress={() => {
                setVisible(false);
                setCancelDialog(false);
              }}
            ></Button>
          </View>
        </Dialog>
      </View>
    </Modal>
  );
};
