import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IFriend } from "../../../../interface";
import {
  delete_friends,
  follow_friends,
  get_friends,
} from "../../../../service/FriendService";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import useForceUpdate from "antd/lib/_util/hooks/useForceUpdate";

interface Props {
  me: number;
  friend: IFriend;
  friends: IFriend[];
  setFriends: any;
}

export const SearchFriendsListItem = ({
  me,
  friend,
  friends,
  setFriends,
}: Props) => {
  const [listFriends, setListFriends] = useState<IFriend[]>(friends);

  function isFriend() {
    return friends.includes(friend);
  }

  const addFriend = (friendID: number) => {
    follow_friends(friendID).then(() => {
      console.log("ok");
      get_friends().then((res) => setFriends(res.following));
    });
  };

  const deleteFriend = (friendID: number) => {
    delete_friends(friendID).then(() => {
      console.log("ok");
      get_friends().then((res) => setFriends(res.following));
    });
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
          if (!isFriend()) addFriend(friend.id);
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
    width: 20,
  },
});
