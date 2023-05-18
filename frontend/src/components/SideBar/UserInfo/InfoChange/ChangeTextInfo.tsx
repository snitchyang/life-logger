import React, { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { Button } from "@rneui/themed";
import { userinfo_enumerate } from "../../../../data/data";
import { IFriend, IUser } from "../../../../interface";
import { update_userinfo } from "../../../../service/UserService";
import { ChangeInfoStyleSheet } from "./ChangeInfoStyleSheet";
import { FriendsModalStyleSheet } from "../../Friends/FriendsStyleSheet";
import { Icon } from "@ant-design/react-native";
import { Ionicons } from "@expo/vector-icons";
import { place_holder_color } from "../../../../css/cssParams";

interface Props {
  usr: IUser;
  setUser: any;
  kind: number;
  visible: boolean;
  setVisible: any;
}

export const ChangeTextInfo = ({
  usr,
  setUser,
  kind,
  visible,
  setVisible,
}: Props) => {
  const [inputText, setInputText] = useState<string>("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [title, setTitle] = useState("");
  const [inputHeight, setInputHeight] = useState(3);

  useEffect(() => {
    if (kind === userinfo_enumerate.changeName) {
      setTitle("修改姓名");
      setPlaceHolder("> 输入姓名...");
    } else if (kind === userinfo_enumerate.changeSchool) {
      setTitle("修改学校");
      setPlaceHolder("> 输入校名...");
    } else if (kind === userinfo_enumerate.changeBio) {
      setTitle("修改简介");
      setPlaceHolder("> 输入个人简介...");
    }
  }, [kind]);

  function changeInfo(text) {
    if (text) {
      let newUser = usr;
      if (kind === userinfo_enumerate.changeName) {
        newUser.username = text;
        setUser(newUser);
      } else if (kind === userinfo_enumerate.changeSchool) {
        newUser.school = text;
        setUser(newUser);
      } else if (kind === userinfo_enumerate.changeBio) {
        newUser.biography = text;
      }
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={ChangeInfoStyleSheet.wrapper}>
        <View style={ChangeInfoStyleSheet.titleContainer}>
          <Text style={ChangeInfoStyleSheet.titleText}>{title}</Text>
        </View>
        <View style={ChangeInfoStyleSheet.titleContainer}>
          <View style={ChangeInfoStyleSheet.inputFormContainer}>
            <TextInput
              multiline={true}
              placeholder={placeHolder}
              value={inputText}
              onChangeText={(text) => {
                setInputText(text);
                changeInfo(text);
              }}
            />
          </View>
        </View>
        <View style={ChangeInfoStyleSheet.buttonContainer}>
          <View style={ChangeInfoStyleSheet.buttonView}>
            <Pressable
              style={ChangeInfoStyleSheet.button}
              onPress={() => {
                setInputText("");
                setVisible(false);
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={ChangeInfoStyleSheet.text}>{"保存"}</Text>
                <Ionicons
                  style={{ marginLeft: 5 }}
                  size={15}
                  color={"white"}
                  name="save"
                ></Ionicons>
              </View>
            </Pressable>
          </View>
          <View style={ChangeInfoStyleSheet.buttonView}>
            <Pressable
              style={ChangeInfoStyleSheet.button}
              onPress={() => {
                setInputText("");
                setVisible(false);
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={ChangeInfoStyleSheet.text}>{"取消"}</Text>
                <Ionicons
                  style={{ marginLeft: 5 }}
                  size={15}
                  color={"white"}
                  name="close"
                ></Ionicons>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
