import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IFriend } from "../../../../interface";
import { get_friends, search_friends } from "../../../../service/FriendService";
import { SearchFriendsListItem } from "./SearchListItem";

interface Props {
  me: number;
  isVisible: boolean;
  setVisible: any;
}

export const FriendsSearchModal = ({ me, isVisible, setVisible }: Props) => {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<IFriend[]>([]);
  const [following, setFollowing] = useState<IFriend[]>([]);

  useEffect(() => {
    get_friends().then((res) => setFollowing(res.following));
  }, []);

  function search(text) {
    // console.log(text);
    if (text) {
      search_friends(text).then((res) => setFilter(res));
    } else {
      setFilter([]);
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
          placeholder={"> input name"}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
          // onChangeText={(item) => search(item)}
        />
        <Button
          onPress={(inputText) => search(inputText)}
          title={"Search"}
        ></Button>
        <FlatList
          style={searchFriendsStyleSheet.listItem}
          data={filter}
          renderItem={({ item }) => (
            <SearchFriendsListItem me={me} friend={item} friends={following} />
          )}
        />
      </View>
    </Modal>
  );
};

const searchFriendsStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: {
    flex: 8,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 40,
  },
  cancelContainer: {
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 10,
    textAlign: "center",
    color: "#3f90a8",
    marginRight: 20,
    paddingTop: 10,
  },
  inputItem: {
    marginHorizontal: 10,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: "#dedede",
  },
  listItem: {
    width: "90%",
    marginVertical: 10,
  },
});
