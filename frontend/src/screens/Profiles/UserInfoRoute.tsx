import { SafeAreaView, TouchableOpacity } from "react-native";
import { AvatarInfo } from "../../components/SideBar/UserInfo/DetailedInfo/AvatarInfo";
import { NameInfo } from "../../components/SideBar/UserInfo/DetailedInfo/NameInfo";
import { GenderInfo } from "../../components/SideBar/UserInfo/DetailedInfo/GenderInfo";
import { SchoolInfo } from "../../components/SideBar/UserInfo/DetailedInfo/SchoolInfo";
import React, { useState } from "react";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { ChangeInfo } from "../../components/SideBar/UserInfo/ChangeInfo/ChangeInfo";
import { type IUser } from "../../interface";

// interface UserInfoRoute {
//     user: IUser;
// }

// eslint-disable-next-line react/prop-types
export const UserInfo = ({ route }): JSX.Element => {
  // eslint-disable-next-line react/prop-types
  const { user } = route.params;
  const [modalVisible, setModalVisible] = useState(true);
  const [kind, setKind] = useState(-1);
  const [usr, setUser] = useState<IUser>(user);
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 25 }}>
      <ChangeInfo
        usr={usr}
        setUser={setUser}
        kind={kind}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(0);
          setModalVisible(true);
        }}
      >
        <AvatarInfo avaUri={usr.avatar} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(1);
          setModalVisible(!modalVisible);
        }}
      >
        <NameInfo name={usr.username} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(2);
          setModalVisible(!modalVisible);
        }}
      >
        <GenderInfo gender={usr.gender} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(3);
          setModalVisible(!modalVisible);
        }}
      >
        <SchoolInfo school={usr.school} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
