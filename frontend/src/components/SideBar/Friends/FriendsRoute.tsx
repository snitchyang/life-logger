import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { IUser } from "../../../interface";
import { FriendsList } from "./FriendsView/FriendsList";
import { friendsViewStyleSheet } from "./FriendsStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { SearchFriends } from "./FriendsView/SearchFriends";
import { users } from "../../../data/data";

export const FriendsRoute = ({ route }) => {
  const { user } = route.params;
  const [isVisible, setIsVisible] = useState(false);

  function getFriends(friendsList: number[]) {
    let f: IUser[] = [];
    let user: IUser;
    for (const friendsListElement of friendsList) {
      for (const usr of users) {
        if (usr.id === friendsListElement) {
          f.push(usr);
        }
      }
    }
    return f;
  }

  return (
    <View style={friendsViewStyleSheet.wrapper}>
      <SearchFriends
        me={user.id}
        isVisible={isVisible}
        setVisible={setIsVisible}
      />
      <View style={friendsViewStyleSheet.titleContainer}>
        <Text style={friendsViewStyleSheet.titleText}>{"Friends"}</Text>
      </View>
      <TouchableOpacity
        style={friendsViewStyleSheet.addButtonContainer}
        onPress={() => {
          setIsVisible(true);
        }}
      >
        <Ionicons
          size={24}
          style={{ paddingLeft: 110 }}
          name="add-circle-outline"
        ></Ionicons>
        <Text style={friendsViewStyleSheet.addButtonText}>
          {"Add new friends"}
        </Text>
      </TouchableOpacity>
      <View style={friendsViewStyleSheet.friendsListContainer}>
        <FriendsList friends={getFriends(user.friends)} />
      </View>
    </View>
  );
};
