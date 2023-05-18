import { IFriend } from "../../../../interface";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { friendsStyleSheet } from "../FriendsStyleSheet";
import { Avatar } from "@rneui/base";

interface Props {
  followMe: IFriend[];
}

export const FollowMeList = ({ followMe }: Props) => {
  return (
    <FlatList
      data={followMe}
      renderItem={({ item }) => (
        <View style={friendsStyleSheet.wrapper}>
          <View style={friendsStyleSheet.avatarContainer}>
            <Avatar size={32} rounded={true} source={{ uri: item.avatar }} />
          </View>
          <View style={friendsStyleSheet.nameContainerFollowMe}>
            <Text style={friendsStyleSheet.nameText}>{item.username}</Text>
          </View>
        </View>
      )}
    />
  );
};
