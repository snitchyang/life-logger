import { type IUser } from "../../../../interface";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { friendsStyleSheet, searchListStyleSheet } from "../FriendsStyleSheet";

interface FriendsList {
  friends: IUser[];
}

interface RenderList {
  item: IUser;
}

const RenderList = ({ item }) => {
  return (
    <View style={friendsStyleSheet.wrapper}>
      <View style={friendsStyleSheet.avatarContainer}>
        <Avatar
          size={32}
          rounded={true}
          source={{ uri: item.profilePicture }}
        />
      </View>
      <View style={friendsStyleSheet.nameContainer}>
        <Text style={friendsStyleSheet.nameText}>{item.name}</Text>
      </View>
      <TouchableOpacity style={friendsStyleSheet.iconContainer}>
        <Ionicons name="trash-outline"></Ionicons>
      </TouchableOpacity>
    </View>
  );
};

export const FriendsList = ({ friends }: FriendsList) => {
  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => <RenderList item={item} />}
    />
  );
};
