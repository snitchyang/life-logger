import { Text, View } from "react-native";
import { userInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface Props {
  bio: string;
}

export const BioInfo = ({ bio }) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"Bio:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Text style={userInfoStyleSheet.boxInfoText}>{bio}</Text>
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
