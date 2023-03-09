import { TouchableOpacity, View } from "react-native";
import { AvatarInfo } from "./DetailedInfo/AvatarInfo";
import { NameInfo } from "./DetailedInfo/NameInfo";
import { IUser } from "../../../interface";
import { GenderInfo } from "./DetailedInfo/GenderInfo";
import { SchoolInfo } from "./DetailedInfo/SchoolInfo";
import { useEffect, useRef, useState } from "react";
import { userInfoStyleSheet } from "./UserInfoStyleSheet";
import { ChangeInfo } from "./ChangeInfo/ChangeInfo";

interface UserInfoRoute {
  user: IUser;
}

export const UserInfo = ({ user }: UserInfoRoute) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [kind, setKind] = useState(-1);
  const [usr, setUser] = useState(user);
  return (
    <View style={{ flex: 1 }}>
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
