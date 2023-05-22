import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
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
import { IDiary, IImage, IPResponse, ITag } from "../../../interface";
import { AddImageList, AddPost } from "../../../service/PostService";
import { OpenImageList } from "../../Image/OpenImageList";
import { LocationPicker } from "../../Location/LocationPicker";
import { use } from "i18next";
import {
  add_diary,
  add_diary_image,
  get_tags,
} from "../../../service/DiaryService";
import { emtpy_diary } from "../../../constants/info";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { ButtonStyle, LayoutStyle } from "../../../css/GlobalStyleSheet";
import { TagButton } from "./TagButton";

interface Props {
  diary_proto?: IDiary;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const amap_host = "https://restapi.amap.com/v3";
const amap_key = "3925351c690b4a56bbbfc5adac5f39e0";
const width = Dimensions.get("window").width;
export const AddDiaryModal = ({ diary_proto, visible, setVisible }: Props) => {
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [galleryPermission, setGalleryPermission] = useState<boolean>(false);
  const [doneDisable, setDoneDisable] = useState(true);
  const [addLocation, setAddLocation] = useState(false);
  const [location, setLocation] = useState("添加位置");
  const [cancelDialog, setCancelDialog] = useState(false);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [diary, setDiary] = useState<IDiary>(emtpy_diary);
  const [tagSet, setTagSet] = useState<Set<ITag>>(new Set<ITag>());

  useEffect(() => {
    if (diary_proto) {
      setDiary(diary_proto);
    }
  }, [diary_proto]);

  useEffect(() => {
    if (Platform.OS === "android" && !galleryPermission) {
      permissionFunc().catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    get_tags().then((res) => {
      setAllTags(res);
    });
  }, []);

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
    }).then((res) => {
      if (res.canceled) return;
      try {
        add_diary_image(res.assets.map((value) => value.base64))
          .then((res) => {
            let new_images: IImage[] = [];
            res
              ? res.map((item) => {
                  new_images.push({ path: item });
                })
              : [];
            setDiary({
              ...diary,
              images: [...new_images, ...diary.images],
            });
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
      <TouchableOpacity
        activeOpacity={3}
        style={{ position: "absolute", top: 60, left: 20, padding: 3 }}
        onPress={() => {
          if (diary.content.length === 0 && diary.images.length === 0) {
            setVisible(false);
          } else setCancelDialog(true);
        }}
      >
        <Ionicons name={"chevron-back-outline"} size={30}></Ionicons>
      </TouchableOpacity>
      <TouchableOpacity style={{ position: "absolute", top: 60, right: 20 }}>
        <Button
          color={"green"}
          disabled={doneDisable}
          style={{ padding: 2 }}
          onPress={async () => {
            setVisible(false);
            let tags: ITag[] = [];
            tagSet.forEach((tag) => tags.push(tag));
            setDiary({ ...diary, tag: tags });
            await add_diary(diary).then((res) => {
              console.log(res);
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
              {"记录"}
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
            flexDirection: "row-reverse",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              marginRight: 40,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              name="add-a-photo"
              size={26}
              color="black"
              onPress={handleAddPicCheck}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          marginLeft: 20,
          marginTop: 45,
          flexDirection: "row",
          width: "70%",
        }}
      >
        <Text style={{ marginLeft: 4, marginTop: 6 }}>{"开始时间: "}</Text>
        <RNDateTimePicker
          style={{ width: "40%" }}
          value={diary.begin}
          onChange={(event, date) => {
            if (event.type === "set")
              setDiary({
                ...diary,
                begin: date,
              });
          }}
        />
        <RNDateTimePicker
          style={{ width: "30%" }}
          value={diary.begin}
          // minuteInterval={15}
          mode={"time"}
          display="compact"
          onChange={(event, date) => {
            if (event.type === "set") {
              setDiary({
                ...diary,
                begin: date,
              });
            }
          }}
        />
      </View>
      <View
        style={{
          marginLeft: 20,
          flexDirection: "row",
          marginTop: 10,
          width: "70%",
        }}
      >
        <Text style={{ marginLeft: 4, marginTop: 6 }}>{"结束时间: "}</Text>
        <RNDateTimePicker
          style={{ width: "40%" }}
          value={diary.end}
          minimumDate={diary.begin}
          onChange={(event, date) => {
            if (event.type === "set")
              setDiary({
                ...diary,
                end: date,
              });
          }}
        />
        <RNDateTimePicker
          style={{ width: "30%" }}
          value={diary.end}
          // minuteInterval={15}
          mode={"time"}
          minimumDate={diary.begin}
          onChange={(event, date) => {
            if (event.type === "set")
              setDiary({
                ...diary,
                end: date,
              });
          }}
        />
      </View>
      <View style={{ justifyContent: "space-between", ...LayoutStyle.center }}>
        <View
          style={{
            width: "100%",
            justifyContent: "space-between",
            ...LayoutStyle.center,
          }}
        >
          <FlatList
            data={allTags}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={(tag) => (
              <TagButton tag={tag.item} tagSet={tagSet} setTagSet={setTagSet} />
            )}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          paddingTop: 10,
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <TextInput
          placeholder={"标题"}
          value={diary.title}
          onChangeText={(text) => {
            setDiary({ ...diary, title: text });
            if (text.length !== 0) setDoneDisable(false);
          }}
          style={{ marginBottom: 20, fontSize: 16 }}
        />
        <TextInput
          placeholder={"内容"}
          value={diary.content}
          onChangeText={(text) => {
            setDiary({ ...diary, content: text });
            if (text.length !== 0) setDoneDisable(false);
          }}
          style={{ marginBottom: 20, fontSize: 16 }}
        />
        <OpenImageList
          image={diary.images}
          setImage={(img) => {
            setDiary({
              ...diary,
              images: img,
            });
          }}
        />
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
                setDiary(emtpy_diary);
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
