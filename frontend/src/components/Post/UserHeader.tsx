import React from "react";
import { Image, View } from "react-native";
import { IFriend } from "../../interface";
import { Text } from "@rneui/base";
import { getTimeDistance } from "../../service/TimeService";

interface UserHeader {
  date: Date;
  user: IFriend;
}

export const UserHeader = ({ user, date }: UserHeader) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: user.avatar }}
        style={{ width: 30, height: 30, borderRadius: 3, margin: "auto" }}
        alt={""}
      />
      <Text style={{ fontSize: 20, margin: "auto", marginLeft: 10 }}>
        {user.username}
      </Text>
      <Text style={{ fontSize: 15, margin: "auto", marginLeft: 10 }}>
        {getTimeDistance(date)}
      </Text>
    </View>
  );
};
