import { SafeAreaView, TouchableOpacity, View } from "react-native";
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

export const infoEnum = {
  changeProfile: 0,
  changeName: 1,
  changeGender: 2,
  changeBio: 3,
  changeSchool: 4,
};

export const UserInfo = ({ route, navigation }) => {
  const { user } = route.params;
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [kind, setKind] = useState<number>(-1);
  const [usr, setUser] = useState<IUser>(user);

  return (
    <View style={{ flex: 1, marginTop: 25 }}>
      <ChangeTextInfo
        usr={usr}
        setUser={setUser}
        kind={kind}
        visible={visible}
        setVisible={setVisible}
      />
      <ChangeImageInfo
        usr={usr}
        setUser={setUser}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          console.log("haha");
          setModalVisible(true);
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
    </View>
  );
};
