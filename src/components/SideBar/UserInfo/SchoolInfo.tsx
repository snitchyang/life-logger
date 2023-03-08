import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";

export const SchoolInfo = ({ school }) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"School:"}</Text>
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
