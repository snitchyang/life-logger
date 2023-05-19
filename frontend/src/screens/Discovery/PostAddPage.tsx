import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { Button, Text } from "@rneui/base";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { AddImageList, AddPost } from "../../service/PostService";
import { OpenImageList } from "../../components/Image/OpenImageList";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const width = Dimensions.get("window").width;
export const PostAddPage = ({ visible, setVisible }: Props) => {
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [galleryPermission, setGalleryPermission] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [cancelDialog, setCancelDialog] = useState(false);
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
      // allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      allowsMultipleSelection: true,
    }).then((result) => {
      if (!result.canceled) {
        try {
          AddImageList(result.assets.map((value) => value.base64)).then((res) =>
            setImages(res)
          );
        } catch (e) {
          console.error(e);
        }
      } else console.log("cancel");
    });
  };
  return (
    <Modal
      animationType={"slide"}
      visible={visible}
      onTouchCancel={() => setVisible(false)}
    >
      <View
        style={{
          top: 30,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>{"发表帖子"}</Text>
        </View>
        <Pressable style={{ alignItems: "flex-end", marginRight: 30 }}>
          <MaterialIcons
            name="add-a-photo"
            size={24}
            color="black"
            onPress={handleAddPicCheck}
          />
        </Pressable>
      </View>
      <View
        style={{
          borderWidth: 2,
          marginTop: 40,
          paddingTop: 10,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <TextInput
          placeholder={"这一刻的想法..."}
          value={text}
          onChangeText={(text) => setText(text)}
        />

        <OpenImageList urls={images} />
      </View>
      <View
        style={{
          flexDirection: "row",
          // alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 50,
        }}
      >
        <Button
          icon={{ name: "close", color: "black" }}
          color={"rgb(218,218,218)"}
          onPress={() => setVisible(false)}
          style={{ marginRight: 40, display: "flex" }}
        >
          <Text style={{ color: "black" }}>{"取消"}</Text>
        </Button>
        <Button
          icon={{ name: "done", color: "white" }}
          color={"rgb(0,0,0)"}
          onPress={() => setVisible(false)}
          style={{ marginLeft: 40, display: "flex", borderWidth: 3 }}
        >
          <Text
            style={{ color: "white" }}
            onPress={async () => {
              await AddPost(images, "", text).then((res) => {
                setVisible(false);
                setText("");
                setImages([]);
              });
            }}
          >
            {"发表"}
          </Text>
        </Button>
      </View>
    </Modal>
  );
};
