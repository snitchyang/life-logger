import { SafeAreaView, TouchableOpacity } from "react-native";
import { AvatarInfo } from "../../components/SideBar/UserInfo/DetailedInfo/AvatarInfo";
import { NameInfo } from "../../components/SideBar/UserInfo/DetailedInfo/NameInfo";
import { GenderInfo } from "../../components/SideBar/UserInfo/DetailedInfo/GenderInfo";
import { SchoolInfo } from "../../components/SideBar/UserInfo/DetailedInfo/SchoolInfo";
import React, { useState } from "react";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { BioInfo } from "../../components/SideBar/UserInfo/DetailedInfo/BioInfo";
import { IUser } from "../../interface";
import { ChangeImageInfo } from "../../components/SideBar/UserInfo/InfoChange/ChangeImageInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChangeTextInfo } from "../../components/SideBar/UserInfo/InfoChange/ChangeTextInfo";

export const infoEnum = {
  changeProfile: 0,
  changeName: 1,
  changeGender: 2,
  changeBio: 3,
  changeSchool: 4,
};

const Stack = createNativeStackNavigator();

// export const UserInfoRoute = ({ route, navigation }) => {
//   const { user } = route.params;
//   const [usr, setUser] = useState<IUser>(user);
//   return (
//     <Stack.Navigator initialRouteName={"UserInfo"}>
//       <Stack.Screen
//         name={"UserInfo"}
//         component={UserInfo}
//         initialParams={{ user: usr, setUser: setUser }}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name={"ChangeImageInfo"}
//         component={ChangeImageInfo}
//         initialParams={{ user: usr, setUser: setUser }}
//         options={{
//           headerShown: true,
//         }}
//       />
//     </Stack.Navigator>
//   );
// };

export const UserInfo = ({ route, navigation }) => {
  const { user } = route.params;
  const [visible, setVisible] = useState(false);
  const [kind, setKind] = useState<number>(-1);
  const [usr, setUser] = useState<IUser>(user);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <ChangeTextInfo
        usr={usr}
        setUser={setUser}
        kind={kind}
        visible={visible}
        setVisible={setVisible}
      />
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          // setKind(infoEnum.changeProfile);
          // setVisible(true);
          // navigation.navigate("ChangeImageInfo");
          console.log("haha");
        }}
      >
        <AvatarInfo avaUri={usr.avatar} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(infoEnum.changeName);
          setVisible(true);
        }}
      >
        <NameInfo name={usr.username} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(infoEnum.changeGender);
          setVisible(true);
        }}
      >
        <GenderInfo gender={usr.gender} usr={usr} setUser={setUser} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(infoEnum.changeBio);
          setVisible(true);
        }}
      >
        <BioInfo bio={usr.biography} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(infoEnum.changeSchool);
          setVisible(true);
        }}
      >
        <SchoolInfo school={usr.school} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
