import { Modal, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { changeInfoStyleSheet } from "../UserInfoStyleSheet";
import { IUser } from "../../../../interface";
import { Button } from "@rneui/base";
import { use } from "i18next";
import { ChangeTextInfo } from "./ChangeTextInfo";

export const ChangeInfo = ({ kind, visible, setVisible }) => {
  console.log("modal");
  console.log(kind);

  if (kind === 1 || kind === 3) {
    return (
      <ChangeTextInfo kind={kind} visible={visible} setVisible={setVisible} />
    );
  }
};

const ChangeGenderInfo = ({ visible, setVisible }) => {};
