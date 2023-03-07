import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { ChangeInfo } from "./ChangeInfo";
import { useState } from "react";

export const NameInfo = ({ name }) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text>{"Name:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Text>{name}</Text>
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
