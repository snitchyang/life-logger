import { Text, View } from "react-native";
import { userInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { ChangeGenderInfo } from "../ChangeInfo/ChangeGenderInfo";

export const GenderInfo = ({ gender }) => {
  let Gender: string = undefined;
  if (gender === 0) Gender = "male";
  else if (gender === 1) Gender = "female";
  else Gender = "unknown";
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"Gender:"}</Text>
      </View>
      <ChangeGenderInfo Gender={Gender} />
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
