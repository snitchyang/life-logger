import { IFriend, IUser } from "../../../../interface";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { friendsStyleSheet, searchListStyleSheet } from "../FriendsStyleSheet";
import React, { useEffect, useState } from "react";
import { get_friends } from "../../../../service/FriendService";

interface Props2 {
  friends: IFriend[];
}

interface Props {
  item: IFriend;
}

const RenderList = ({ item }: Props) => {
  return (
    <View style={friendsStyleSheet.wrapper}>
      <View style={friendsStyleSheet.avatarContainer}>
        <Avatar size={32} rounded={true} source={{ uri: item.avatar }} />
      </View>
      <View style={friendsStyleSheet.nameContainer}>
        <Text style={friendsStyleSheet.nameText}>{item.username}</Text>
      </View>
      <TouchableOpacity style={friendsStyleSheet.iconContainer}>
        <Ionicons name="trash-outline"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export const FriendsList = ({ friends }: Props2) => {
  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => <RenderList item={item} />}
    />
  );
};
