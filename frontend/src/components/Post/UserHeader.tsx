import React from "react";
import { Image, View } from "react-native";
import { IUser } from "../../interface";
import { Text } from "@rneui/base";
import { getTimeDistance } from "../../service/TimeService";

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
      <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 2 }}>
        {user.username}
      </Text>
      <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 4 }}>
        {getTimeDistance(date)}
      </Text>
    </View>
  );
};
