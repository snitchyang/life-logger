import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "@rneui/base";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { AddImageList, AddPost } from "../../service/PostService";
import { OpenImageList } from "../../components/Image/OpenImageList";

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
          // result.assets.forEach(async (value) => {
          //   await AddImage(value.base64).then((res) =>
          //     setImages([...images, res.url])
          //   );
          // });
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
      <TouchableOpacity
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          left: 20,
          top: 40,
        }}
      >
        <Button
          // icon={{ name: "close", color: "black" }}
          color={"rgb(218,218,218)"}
          onPress={() => setVisible(false)}
        >
          <Text style={{ color: "white" }}>{"取消"}</Text>
        </Button>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          right: 20,
          top: 40,
        }}
      >
        <Button
          // icon={{ name: "close", color: "black" }}
          color={"rgb(0,0,0)"}
          onPress={() => setVisible(false)}
        >
          <Text style={{ color: "white" }}>{"发表"}</Text>
        </Button>
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: Dimensions.get("window").width,
          top: 50,
        }}
      >
        <Text style={{ fontSize: 20 }}>{"发表帖子"}</Text>
      </View>
      <View
        style={{
          borderWidth: 2,
          marginTop: 70,
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
        <Button onPress={handleAddPicCheck}>
          <Text>{"添加图片"}</Text>
        </Button>
        <OpenImageList urls={images} />
      </View>
      <Button onPress={() => setVisible(false)}>
        <Text>{"cancel"}</Text>
      </Button>
      <Button
        onPress={() => {
          setText("");
          setImages([]);
        }}
      >
        <Text>{"clear"}</Text>
      </Button>
      <Button
        onPress={async () => {
          await AddPost(images, "", text).then((res) => {
            setVisible(false);
            setText("");
            setImages([]);
          });
        }}
      >
        <Text>{"done"}</Text>
      </Button>
    </Modal>
  );
};
