import React, { useEffect, useState } from "react";
import { Alert, Modal, Pressable, Text, TextInput, View } from "react-native";
import { IUser } from "../../../../interface";
import { update_userinfo } from "../../../../service/UserService";
import { ChangeInfoStyleSheet } from "./ChangeInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import {
  ButtonStyle,
  InputFormStyle,
  LayoutStyle,
} from "../../../../css/GlobalStyleSheet";
import { userinfo_enumerate } from "../../../../constants/info";

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

  useEffect(() => {
    switch (kind) {
      case userinfo_enumerate.changeName:
        setInputText(usr.username);
        break;
      case userinfo_enumerate.changeBio:
        setInputText(usr.biography);
        break;
      case userinfo_enumerate.changeSchool:
        setInputText(usr.school);
        break;
    }
  }, [kind]);

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

  const changeInfo = (text: string) => {
    if (text) {
      let newUser = usr;
      if (kind === userinfo_enumerate.changeName) {
        newUser.username = text;
        setUser(newUser);
        if (usr.username) setInputText(usr.username);
      } else if (kind === userinfo_enumerate.changeSchool) {
        newUser.school = text;
        setUser(newUser);
        if (usr.school) setInputText(usr.school);
      } else if (kind === userinfo_enumerate.changeBio) {
        newUser.biography = text;
        setUser(newUser);
        if (usr.biography) setInputText(usr.biography);
      }
    }
  };

  const recoverInfo = () => {
    switch (kind) {
      case userinfo_enumerate.changeName:
        setInputText(usr.username);
        break;
      case userinfo_enumerate.changeSchool:
        setInputText(usr.school);
        break;
      case userinfo_enumerate.changeBio:
        setInputText(usr.biography);
        break;
    }
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
      <View style={ChangeInfoStyleSheet.wrapper}>
        <View style={ChangeInfoStyleSheet.titleContainer}>
          <Text style={ChangeInfoStyleSheet.titleText}>{title}</Text>
        </View>
        <View style={ChangeInfoStyleSheet.titleContainer}>
          <View
            style={{
              minHeight: 80,
              marginBottom: 30,
              ...InputFormStyle.inputFormContainer,
            }}
          >
            <TextInput
              style={InputFormStyle.inputForm}
              multiline={true}
              placeholder={placeHolder}
              value={inputText}
              onChangeText={(text) => {
                setInputText(text);
              }}
            />
          </View>
        </View>
        <View style={ChangeInfoStyleSheet.buttonContainer}>
          <View style={ChangeInfoStyleSheet.buttonView}>
            <Pressable
              style={ButtonStyle.button}
              onPress={() => {
                if (
                  kind === userinfo_enumerate.changeName &&
                  inputText === ""
                ) {
                  Alert.alert("用户名不能为空！");
                  return;
                }
                setVisible(false);
                changeInfo(inputText);
                update_userinfo(usr);
              }}
            >
              <View style={LayoutStyle.rowCenter}>
                <Text style={ButtonStyle.text}>{"保存"}</Text>
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
                // setInputText("");
                recoverInfo();
                setVisible(false);
              }}
            >
              <View style={LayoutStyle.rowCenter}>
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
