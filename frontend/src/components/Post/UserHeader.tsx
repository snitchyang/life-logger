import React from "react";
import { View } from "react-native";
import { IFriend } from "../../interface";
import { Text } from "@rneui/themed";
import { getTimeDistance } from "../../service/TimeService";
import { OpenImage } from "../Image/OpenImage";

interface UserHeader {
  date: Date;
  user: IFriend;
}

export const UserHeader = ({ user, date }: UserHeader) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <OpenImage
        url={user.avatar}
        style={{ width: 35, height: 35, borderRadius: 3, margin: "auto" }}
      />
      <View>
        <Text style={{ fontSize: 20, margin: "auto", marginLeft: 10 }}>
          {user.username}
        </Text>
        <Text style={{ fontSize: 15, margin: "auto", marginLeft: 10 }}>
          {getTimeDistance(date)}
        </Text>
      </View>
    </View>
  );
};
