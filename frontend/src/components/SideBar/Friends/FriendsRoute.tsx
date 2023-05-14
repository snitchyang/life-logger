import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { IFriend } from "../../../interface";
import { FriendsList } from "./FriendsView/FriendsList";
import { friendsViewStyleSheet } from "./FriendsStyleSheet";
import { Ionicons } from "@expo/vector-icons";
import { FriendsSearchModal } from "./FriendsView/FriendsSearchModal";
import { get_friends } from "../../../service/FriendService";
import { Tab } from "@rneui/themed";

export const FriendsRoute = ({ route }) => {
  const { user } = route.params;
  const [index, setIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [following, setFollowing] = useState<IFriend[]>([]);
  const [followMe, setFollowMe] = useState<IFriend[]>([]);

  useEffect(() => {
    get_friends().then((res) => {
      setFollowing(res.following);
      setFollowMe(res.follow_me);
    });
  }, []);

  return (
    <View style={friendsViewStyleSheet.wrapper}>
      <Tab value={index} onChange={setIndex} dense>
        <Tab.Item>{"Following"}</Tab.Item>
        <Tab.Item>{"Follow Me"}</Tab.Item>
      </Tab>
      <FriendsSearchModal
        me={user.id}
        isVisible={isVisible}
        setVisible={setIsVisible}
      />

      <View>
        <View style={friendsViewStyleSheet.titleContainer}>
          <Text style={friendsViewStyleSheet.titleText}>{"Friends"}</Text>
        </View>
        <TouchableOpacity
          id={"add-friend-button"}
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
        <View
          id={"friend-list"}
          style={friendsViewStyleSheet.friendsListContainer}
        >
          <FriendsList friends={index === 0 ? following : followMe} />
        </View>
      </View>
    </View>
  );
};
