import { Text, View } from "react-native";
import { userInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { ChangeGenderInfo } from "../InfoChange/ChangeGenderInfo";
import React from "react";
import { IUser } from "../../../../interface";

interface Props {
  gender: string;
  usr: IUser;
  setUser: any;
}

export const GenderInfo = ({ gender, usr, setUser }: Props) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"Gender:"}</Text>
      </View>
      <ChangeGenderInfo gender={gender} usr={usr} setUser={setUser} />
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
