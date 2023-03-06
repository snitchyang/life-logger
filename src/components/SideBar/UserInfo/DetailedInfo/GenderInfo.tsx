import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "../UserInfoStyleSheet";
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
      {/*<View style={userInfoStyleSheet.boxInfo}>*/}
      {/*<Text style={userInfoStyleSheet.boxInfoText}>{Gender}</Text>*/}
      <ChangeGenderInfo Gender={Gender} />
      {/*</View>*/}
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
