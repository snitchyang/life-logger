import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IFriend } from "../../../../interface";
import {
  delete_friends,
  follow_friends,
} from "../../../../service/FriendService";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface Props {
  me: number;
  friend: IFriend;
  friends: IFriend[];
}

export const SearchFriendsListItem = ({ me, friend, friends }: Props) => {
  function isFriend() {
    return friends.includes(friend);
  }
  const addFriend = (friendID: number) => {
    follow_friends(friendID).catch((err) => console.error(err));
  };

  const deleteFriend = (friendID: number) => {
    delete_friends(friendID).catch((err) => console.error(err));
  };

  return (
    <View style={searchListStyleSheet.wrapper}>
      <View style={searchListStyleSheet.avatarContainer}>
        <Avatar
          containerStyle={{ marginLeft: 15 }}
          size={20}
          rounded={true}
          source={{ uri: friend.avatar }}
        />
      </View>
      <View style={searchListStyleSheet.nameContainer}>
        <Text style={searchListStyleSheet.nameText}>{friend.username}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (isFriend()) addFriend(friend.id);
          else deleteFriend(friend.id);
        }}
      >
        {isFriend() ? (
          <Ionicons
            style={searchListStyleSheet.iconItem}
            name="close-circle-outline"
          ></Ionicons>
        ) : (
          <Ionicons
            style={searchListStyleSheet.iconItem}
            name="add-circle-outline"
          ></Ionicons>
        )}
      </TouchableOpacity>
    </View>
  );
};

const searchListStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginVertical: 5,
  },
  avatarContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameContainer: {
    flex: 12,
    textAlign: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "black",
  },
  nameText: {
    textAlign: "center",
    fontSize: 12,
  },
  friendsText: {
    fontSize: 10,
    color: "grey",
  },
  iconItem: {
    flex: 1,
  },
});
