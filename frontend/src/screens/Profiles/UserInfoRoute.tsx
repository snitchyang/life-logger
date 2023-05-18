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

export const UserInfo = ({ route }) => {
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
          setKind(userinfo_enumerate.changeProfile);
          setVisible(true);
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
