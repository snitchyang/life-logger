import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { AvatarInfo } from "./DetailedInfo/AvatarInfo";
import { NameInfo } from "./DetailedInfo/NameInfo";
import { IUser } from "../../../interface";
import { GenderInfo } from "./DetailedInfo/GenderInfo";
import { SchoolInfo } from "./DetailedInfo/SchoolInfo";
import { useEffect, useRef, useState } from "react";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { ChangeInfo } from "./ChangeInfo/ChangeInfo";
import { ChangeGenderInfo } from "./ChangeInfo/ChangeGenderInfo";

interface UserInfo {
  user: IUser;
}

export const UserInfo = ({ user }: UserInfo) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [kind, setKind] = useState(-1);
  return (
    <View style={{ flex: 1 }}>
      <ChangeInfo
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
        <AvatarInfo avaUri={user.profilePicture} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(1);
          setModalVisible(!modalVisible);
        }}
      >
        <NameInfo name={user.name} />
      </TouchableOpacity>
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(2);
          setModalVisible(!modalVisible);
        }}
      >
        <GenderInfo gender={user.gender} />
      </TouchableOpacity>
      {/*<ChangeGenderInfo />*/}
      <TouchableOpacity
        style={userInfoStyleSheet.boxContainer}
        onPress={() => {
          setKind(3);
          setModalVisible(!modalVisible);
        }}
      >
        <SchoolInfo school={user.school} />
      </TouchableOpacity>
    </View>
  );
};
