import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";

export const GenderInfo = ({ gender }) => {
  let Gender: string = undefined;
  if (gender === 0) Gender = "male";
  else if (gender === 1) Gender = "female";
  else Gender = "unknown";
  return (
    <TouchableOpacity style={userInfoStyleSheet.boxContainer}>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text>{"Gender:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Text>{Gender}</Text>
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </TouchableOpacity>
  );
};
