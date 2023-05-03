import React from "react";
import { Image, View } from "react-native";
import { IUser } from "../../interface";
import { Text } from "@rneui/base";

interface UserHeader {
  date: Date;
  user: IUser;
}

export const UserHeader = ({ user, date }: UserHeader) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 30, height: 30 }}
        alt={""}
      />
      <Text style={{ fontSize: 20, marginLeft: 5, marginTop: 5 }}>
        {user.username}
      </Text>
      <Text style={{ fontSize: 15, marginLeft: 5, marginTop: 8 }}>
        {new Date().getTime() - new Date(date).getTime()}
        {" ago"}
      </Text>
    </View>
  );
};
