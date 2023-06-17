import { Text, View } from "react-native";
import { userInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export const SchoolInfo = ({ school }) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"学校:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Text style={userInfoStyleSheet.boxInfoText}>{school}</Text>
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
