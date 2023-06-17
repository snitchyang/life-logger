import { Text, View } from "react-native";
import { userInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export const NameInfo = ({ name }) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"用户名:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Text style={userInfoStyleSheet.boxInfoText}>{name}</Text>
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
