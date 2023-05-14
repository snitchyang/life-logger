import React, { useState } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { changeInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { Button } from "@rneui/base";
import { userinfo_enumerate } from "../../../../data/data";
import { IFriend } from "../../../../interface";
import { update_userinfo } from "../../../../service/UserService";

interface Props {
  usr: IFriend;
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

  function changeInfo(text) {
    if (text) {
      let newUser: IFriend = usr;
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

  let title = "";
  let placeHolder = "";
  if (kind === userinfo_enumerate.changeName) {
    title = "Change Name:";
    placeHolder = "> Input new name...";
  } else if (kind === userinfo_enumerate.changeSchool) {
    title = "Change School:";
    placeHolder = "> Input new school...";
  } else if (kind === userinfo_enumerate.changeBio) {
    title = "Change Biography:";
    placeHolder = "> Input new biography...";
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={changeInfoStyleSheet.wrapper}>
        <View style={changeInfoStyleSheet.titleContainer}>
          <Text style={changeInfoStyleSheet.titleText}>{title}</Text>
        </View>
        <View style={changeInfoStyleSheet.titleContainer}>
          <TextInput
            style={changeInfoStyleSheet.inputContainer}
            placeholder={placeHolder}
            value={inputText}
            onChangeText={(text) => {
              setInputText(text);
              changeInfo(text);
            }}
          />
        </View>
        <View style={changeInfoStyleSheet.buttonWrapper}>
          <View style={changeInfoStyleSheet.buttonContainer}>
            <Button
              title={"submit"}
              onPress={() => {
                update_userinfo(usr, null).then(() => {
                  setInputText("");
                  setVisible(false);
                });
              }}
            />
          </View>
          <View style={changeInfoStyleSheet.buttonContainer}>
            <Button
              title={"cancel"}
              onPress={() => {
                setInputText("");
                setVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
