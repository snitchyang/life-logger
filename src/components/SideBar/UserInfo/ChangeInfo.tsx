import { Modal, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { changeInfoStyleSheet } from "./UserInfoStyleSheet";
import { IUser } from "../../../interface";
import { Button } from "@rneui/base";
import { use } from "i18next";

interface ChangeInfo {
  kind: number;
  visible: boolean;
}

interface ChangeDetail {
  visible: boolean;
}

export const ChangeInfo = ({ kind, visible }: ChangeInfo) => {
  console.log("modal");
  console.log(kind);

  if (kind === 1) {
    return <ChangeName visible={visible} />;
  }
};

const ChangeName = ({ visible }: ChangeDetail) => {
  const [inputText, setInputText] = useState("");
  const [isVisible, setVisible] = useState(true);
  console.log(isVisible);
  function changeNameInfo(text) {
    // ????
    if (text) console.log("change name" + text);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={changeInfoStyleSheet.wrapper}>
        <View style={changeInfoStyleSheet.titleContainer}>
          <Text style={changeInfoStyleSheet.titleText}>{"change name:"}</Text>
        </View>
        <View style={changeInfoStyleSheet.titleContainer}>
          <TextInput
            placeholder={"input new name"}
            value={inputText}
            onChangeText={(text) => {
              setInputText(text);
            }}
          ></TextInput>
        </View>
        <View style={changeInfoStyleSheet.buttonWrapper}>
          <View style={changeInfoStyleSheet.buttonContainer}>
            <Button
              title={"submit"}
              onPress={() => {
                setVisible(false);
                changeNameInfo(inputText);
              }}
            />
          </View>
          <View style={changeInfoStyleSheet.buttonContainer}>
            <Button
              title={"cancel"}
              onPress={() => {
                setVisible(false);
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
