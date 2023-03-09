import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { users } from "../../../../data/data";
import { IUser } from "../../../../interface";
import {
  searchFriendsStyleSheet,
  searchListStyleSheet,
} from "../FriendsStyleSheet";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";

export const SearchFriends = ({ me, isVisible, setVisible }) => {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState(users);
  const [allUsers] = useState(users);

  function search(text) {
    console.log(text);
    if (text) {
      let newFilter: IUser[] = [];
      for (const usr of users) {
        if (
          usr.id.toString().indexOf(text) > -1 ||
          usr.name.indexOf(text) > -1 ||
          usr.school.indexOf(text) > -1
        )
          newFilter.push(usr);
      }
      setFilter(newFilter);
      setInputText(text);
    } else {
      setFilter(allUsers);
      setInputText(text);
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={searchFriendsStyleSheet.wrapper}>
        <View style={searchFriendsStyleSheet.titleContainer}>
          <Text style={searchFriendsStyleSheet.titleText}>
            {"Search for Friends"}
          </Text>
          <TouchableOpacity
            style={searchFriendsStyleSheet.cancelContainer}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text style={searchFriendsStyleSheet.cancelText}>{"Cancel"}</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={searchFriendsStyleSheet.inputItem}
          placeholder={"> id, name or school"}
          value={inputText}
          onChangeText={(item) => search(item)}
        />
        <FlatList
          style={searchFriendsStyleSheet.listItem}
          data={filter}
          renderItem={({ item }) => <SearchFriendsList me={me} friend={item} />}
        />
      </View>
    </Modal>
  );
};

interface SearchFriendsList {
  me: number;
  friend: IUser;
}

const SearchFriendsList = ({ me, friend }: SearchFriendsList) => {
  function isFriend() {
    return friend.friends.includes(me);
  }

  return (
    <View style={searchListStyleSheet.wrapper}>
      <View style={searchListStyleSheet.avatarContainer}>
        <Avatar
          containerStyle={{ marginLeft: 15 }}
          size={20}
          rounded={true}
          source={{ uri: friend.profilePicture }}
        />
      </View>
      <View style={searchListStyleSheet.nameContainer}>
        <Text style={searchListStyleSheet.nameText}>{friend.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("add friend" + friend.id);
        }}
      >
        {isFriend() ? (
          <Ionicons name="close-circle-outline"></Ionicons>
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
