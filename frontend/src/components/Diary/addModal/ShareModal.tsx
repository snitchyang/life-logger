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
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { IDiary, IImage, IPResponse } from "../../../interface";
import { AddImageList, AddPost } from "../../../service/PostService";
import { OpenImageList } from "../../Image/OpenImageList";
import { LocationPicker } from "../../Location/LocationPicker";

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  diary: IDiary;
}

const amap_host = "https://restapi.amap.com/v3";
const amap_key = "3925351c690b4a56bbbfc5adac5f39e0";
const width = Dimensions.get("window").width;
export const ShareModal = ({
  visible,
  setVisible,
  // getnewPostList,
  diary,
}: Props) => {
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [galleryPermission, setGalleryPermission] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState<IImage[]>([]);
  const [doneDisable, setDoneDisable] = useState(text.length === 0);
  const [addLocation, setAddLocation] = useState(false);
  const [location, setLocation] = useState("添加位置");

  useEffect(() => {
    if (diary) {
      if (diary.content) {
        setText(diary.content);
        setDoneDisable(false);
      }
      if (diary.images) {
        setImages(diary.images);
        setDoneDisable(false);
      }
    }
  }, [diary]);
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

  async function refresh() {
    setText("");
    setImages([]);
    setAddLocation(false);
    setDoneDisable(true);
    setLocation("添加位置");
    // await getnewPostList(1);
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
          .then((res) => {
            let new_images: IImage[] = [];
            if (res)
              res.map((item) => {
                new_images.push({ path: item });
              });
            setImages([...new_images, ...images]);
          })
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
      <TouchableOpacity style={{ position: "absolute", top: 60, left: 20 }}>
        <Ionicons
          name={"chevron-back-outline"}
          size={30}
          onPress={() => {
            setVisible(false);
          }}
          style={{ padding: 2 }}
          // color={"rgb(218,218,218)"}
        ></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity style={{ position: "absolute", top: 60, right: 20 }}>
        <Button
          color={"green"}
          disabled={doneDisable}
          style={{ padding: 2 }}
          onPress={async () => {
            setVisible(false);
            await AddPost(
              images.map((item) => item.path),
              addLocation ? location : "",
              text
            ).then(async () => {
              await refresh();
            });
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 16,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              {"发表"}
            </Text>
          </View>
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
        <Pressable
          style={{ alignItems: "flex-end", marginRight: 40, marginTop: 30 }}
        >
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
          paddingLeft: 25,
          paddingRight: 25,
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
        <OpenImageList image={images} setImage={setImages} />
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
      ></View>
    </Modal>
  );
};
