import { SafeAreaView, TouchableOpacity } from "react-native";
import { AvatarInfo } from "../../components/SideBar/UserInfo/DetailedInfo/AvatarInfo";
import { NameInfo } from "../../components/SideBar/UserInfo/DetailedInfo/NameInfo";
import { GenderInfo } from "../../components/SideBar/UserInfo/DetailedInfo/GenderInfo";
import { SchoolInfo } from "../../components/SideBar/UserInfo/DetailedInfo/SchoolInfo";
import React, { useState } from "react";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { ChangeInfo } from "../../components/SideBar/UserInfo/InfoChange/ChangeInfo";
import { BioInfo } from "../../components/SideBar/UserInfo/DetailedInfo/BioInfo";
import { IUser } from "../../interface";
import { ChangeImageInfo } from "../../components/SideBar/UserInfo/InfoChange/ChangeImageInfo";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const infoEnum = {
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
        component={UserInfoRoute}
        // component={UserInfo}
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

export const UserInfo = ({ navigation, route }) => {
  const { user } = route.params;
  const [visible, setVisible] = useState(true);
  const [kind, setKind] = useState<number>(-1);
  const [usr, setUser] = useState<IUser>(user);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <ChangeInfo
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
          navigation.push("ChangeImageInfo");
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
