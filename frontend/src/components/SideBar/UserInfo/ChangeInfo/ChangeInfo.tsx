import { Modal, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { changeInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { IUser } from "../../../../interface";
import { Button } from "@rneui/base";
import { use } from "i18next";
import { ChangeTextInfo } from "./ChangeTextInfo";

export const ChangeInfo = ({ usr, setUser, kind, visible, setVisible }) => {
  console.log("modal");
  console.log(kind);

  if (kind === 1 || kind === 3) {
    return (
      <ChangeTextInfo
        usr={usr}
        setUser={setUser}
        kind={kind}
        visible={visible}
        setVisible={setVisible}
      />
    );
  }
};
