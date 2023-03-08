import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { ChangeInfo } from "./ChangeInfo/ChangeInfo";
import { useState } from "react";

export const NameInfo = ({ name }) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"Name:"}</Text>
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
