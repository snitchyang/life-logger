import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";

export const AvatarInfo = ({ avaUri }) => {
  return (
    <TouchableOpacity style={userInfoStyleSheet.boxContainer}>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text>{"Avatar:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Avatar size={32} rounded={true} source={{ uri: avaUri }} />
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </TouchableOpacity>
  );
};
