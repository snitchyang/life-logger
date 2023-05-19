import { SafeAreaView, TouchableOpacity } from "react-native";
import { AvatarInfo } from "../../components/SideBar/UserInfo/DetailedInfo/AvatarInfo";
import { NameInfo } from "../../components/SideBar/UserInfo/DetailedInfo/NameInfo";
import { GenderInfo } from "../../components/SideBar/UserInfo/DetailedInfo/GenderInfo";
import { SchoolInfo } from "../../components/SideBar/UserInfo/DetailedInfo/SchoolInfo";
import React, { useState } from "react";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { BioInfo } from "../../components/SideBar/UserInfo/DetailedInfo/BioInfo";
import { IUser } from "../../interface";
import { ChangeTextInfo } from "../../components/SideBar/UserInfo/InfoChange/ChangeTextInfo";
import { ChangeImageInfo } from "../../components/SideBar/UserInfo/InfoChange/ChangeImageInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// interface UserInfoRoute {
//     user: IUser;
// }
export const userinfo_enumerate = {
  changeProfile: 0,
  changeName: 1,
  changeGender: 2,
  changeBio: 3,
  changeSchool: 4,
};

const Stack = createNativeStackNavigator();

export const UserInfoRoute = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"UserInfo"}
        component={UserInfo}
        initialParams={{ user: user }}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"ChangeImageInfo"}
        component={ChangeImageInfo}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export const UserInfo = ({ route }) => {
  const { user } = route.params;
  const [visible, setVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
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
          setKind(userinfo_enumerate.changeProfile);
          // navigate to avatar picker
          // setPickerVisible(true);
        }}
      >
        <AvatarInfo avaUri={usr.avatar} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(userinfo_enumerate.changeName);
          setVisible(true);
        }}
      >
        <NameInfo name={usr.username} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(userinfo_enumerate.changeGender);
          setVisible(true);
        }}
      >
        <GenderInfo gender={usr.gender} usr={usr} setUser={setUser} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(userinfo_enumerate.changeBio);
          setVisible(true);
        }}
      >
        <BioInfo bio={usr.biography} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(userinfo_enumerate.changeSchool);
          setVisible(true);
        }}
      >
        <SchoolInfo school={usr.school} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
