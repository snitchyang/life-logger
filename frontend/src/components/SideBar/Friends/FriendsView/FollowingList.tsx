import { IFriend } from "../../../../interface";
import {
  Alert,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { friendsStyleSheet } from "../FriendsStyleSheet";
import React, { Dispatch, SetStateAction, useState } from "react";
import { delete_friends, get_friends } from "../../../../service/FriendService";

interface Props2 {
  friends: IFriend[];
  setFollowing: Dispatch<SetStateAction<IFriend[]>>;
}

interface Props {
  friend: IFriend;
  setFollowing: Dispatch<SetStateAction<IFriend[]>>;
}

export const FollowingList = ({ friends, setFollowing }: Props2) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    get_friends().then((res) => setFollowing(res.following));
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);
  return (
    <FlatList
      data={friends}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <RenderList friend={item} setFollowing={setFollowing} />
      )}
    />
  );
};

const RenderList = ({ friend, setFollowing }: Props) => {
  return (
    <View style={friendsStyleSheet.wrapper}>
      <View style={friendsStyleSheet.avatarContainer}>
        <Avatar size={32} rounded={true} source={{ uri: friend.avatar }} />
      </View>
      <View style={friendsStyleSheet.nameContainer}>
        <Text style={friendsStyleSheet.nameText}>{friend.username}</Text>
      </View>
      <TouchableOpacity
        style={friendsStyleSheet.iconContainer}
        onPress={() =>
          delete_friends(friend.id).then((res) => {
            if (res.success)
              get_friends().then((res) => setFollowing(res.following));
            else Alert.alert("该用户不存在!");
          })
        }
      >
        <Ionicons name="trash-outline"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};
