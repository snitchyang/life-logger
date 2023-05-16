import { IFriend } from "../../../../interface";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { friendsStyleSheet } from "../FriendsStyleSheet";
import React, { Dispatch, SetStateAction } from "react";
import { delete_friends, get_friends } from "../../../../service/FriendService";

interface Props2 {
  friends: IFriend[];
  setFollowing: Dispatch<SetStateAction<IFriend[]>>;
}

interface Props {
  item: IFriend;
  setFollowing: Dispatch<SetStateAction<IFriend[]>>;
}

export const FriendsList = ({ friends, setFollowing }: Props2) => {
  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => (
        <RenderList item={item} setFollowing={setFollowing} />
      )}
    />
  );
};

const RenderList = ({ item }: Props) => {
  const deleteFriend = (friendID: number) => {
    delete_friends(friendID)
      .then((res) => get_friends())
      .then((res) => res)
      .catch((err) => console.error(err));
  };
  return (
    <View style={friendsStyleSheet.wrapper}>
      <View style={friendsStyleSheet.avatarContainer}>
        <Avatar size={32} rounded={true} source={{ uri: item.avatar }} />
      </View>
      <View style={friendsStyleSheet.nameContainer}>
        <Text style={friendsStyleSheet.nameText}>{item.username}</Text>
      </View>
      <TouchableOpacity
        style={friendsStyleSheet.iconContainer}
        onPress={() => deleteFriend(item.id)}
      >
        <Ionicons name="trash-outline"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};
