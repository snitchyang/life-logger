import { Text, TouchableOpacity, View } from "react-native";
import { userInfoStyleSheet } from "../../../../screens/Profiles/UserInfoStyleSheet";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";

export const AvatarInfo = ({ avaUri }) => {
  return (
    <>
      <View style={userInfoStyleSheet.boxTitle}>
        <Text style={userInfoStyleSheet.boxTitleText}>{"Avatar:"}</Text>
      </View>
      <View style={userInfoStyleSheet.boxInfo}>
        <Avatar
          containerStyle={userInfoStyleSheet.boxInfoAvatar}
          size={32}
          rounded={true}
          source={{ uri: avaUri }}
        />
      </View>
      <View style={userInfoStyleSheet.boxIcon}>
        <Ionicons name="chevron-forward-outline"></Ionicons>
      </View>
    </>
  );
};
