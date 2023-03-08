import { useState } from "react";
import { Modal, Text, TextInput, View } from "react-native";
import { changeInfoStyleSheet } from "../UserInfoStyleSheet";
import { Button } from "@rneui/base";

export const ChangeTextInfo = ({ kind, visible, setVisible }) => {
  const [inputText, setInputText] = useState("");
  function changeNameInfo(text) {
    // ????
    if (text) console.log("change name " + text);
  }
  let title = undefined;
  let placeHolder = undefined;
  if (kind === 1) {
    title = "Change Name:";
    placeHolder = "> Input new name...";
  } else if (kind === 3) {
    title = "Change School:";
    placeHolder = "> Input new school...";
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
          <InputText
            placeHolder={placeHolder}
            inputText={inputText}
            setInputText={setInputText}
          />
        </View>
        <View style={changeInfoStyleSheet.buttonWrapper}>
          <View style={changeInfoStyleSheet.buttonContainer}>
            <SubmitButton setVisible={setVisible} setInputText={setInputText} />
          </View>
          <View style={changeInfoStyleSheet.buttonContainer}>
            <CancelButton setVisible={setVisible} setInputText={setInputText} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const SubmitButton = ({ setVisible, setInputText }) => {
  return (
    <Button
      title={"submit"}
      onPress={() => {
        console.log("submit");
        setVisible(false);
        setInputText("");
      }}
    />
  );
};

const CancelButton = ({ setVisible, setInputText }) => {
  return (
    <Button
      title={"cancel"}
      onPress={() => {
        setVisible(false);
        setInputText("");
      }}
    />
  );
};

const InputText = ({ placeHolder, inputText, setInputText }) => {
  return (
    <TextInput
      style={changeInfoStyleSheet.inputContainer}
      placeholder={placeHolder}
      value={inputText}
      onChangeText={(text) => {
        setInputText(text);
      }}
    ></TextInput>
  );
};
