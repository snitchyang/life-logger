import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";

export const SchoolInfo = ({ school }) => {
  return (
    <TouchableOpacity style={userInfoStyleSheet.boxContainer}>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text>{"School:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Text>{school}</Text>
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </TouchableOpacity>
  );
};
