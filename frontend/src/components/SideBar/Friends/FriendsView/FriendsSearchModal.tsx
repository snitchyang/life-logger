import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IFriend } from "../../../../interface";
import {
  delete_friends,
  follow_friends,
  get_friends,
  search_friends,
} from "../../../../service/FriendService";
import { Avatar } from "@rneui/base";
import { Ionicons } from "@expo/vector-icons";
import { FriendsModalStyleSheet } from "../FriendsStyleSheet";
import useDebounce from "antd/es/form/hooks/useDebounce";
import { debounce } from "../../../../service/Utils";
import { place_holder_color } from "../../../../css/cssParams";

interface Props {
  me: number;
  isVisible: boolean;
  setVisible: any;
  following: IFriend[];
  setFollowing: Dispatch<SetStateAction<IFriend[]>>;
}

export const FriendsSearchModal = ({
  me,
  isVisible,
  setVisible,
  following,
  setFollowing,
}: Props) => {
  const [inputText, setInputText] = useState("");
  const [filter, setFilter] = useState<IFriend[]>([]);

  useEffect(() => {
    get_friends().then((res) => setFollowing(res.following));
  }, []);

  const inputDebounce = useRef(
    debounce((text) => {
      search_friends(text).then((res) => {
        setFilter(res);
      });
    }, 300)
  );
  const onTextChange = (text: string) => {
    const inputValue = text;
    setInputText(inputValue);
    inputDebounce.current(inputValue);
  };

  const search = async (text) => {
    if (text) {
      await search_friends(text).then((res) => {
        setFilter(res);
      });
    } else {
      setFilter([]);
      setInputText(text);
    }
  };

  function isFriend(friend: IFriend) {
    return following.includes(friend);
  }

  const addFriend = async (friendID: number) => {
    await follow_friends(friendID).then((res) => {
      get_friends()
        .then((res) => {
          setFollowing(res.following);
        })
        .then(() => {
          setVisible(false);
        });
    });
  };

  const deleteFriend = async (friendID: number) => {
    await delete_friends(friendID)
      .then((res) => get_friends())
      .then((res) => {
        setFollowing(res.following);
      });
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => {
        setVisible(false);
      }}
    >
      <View style={searchFriendsStyleSheet.wrapper}>
        <View style={FriendsModalStyleSheet.titleContainer}>
          <Text style={FriendsModalStyleSheet.titleText}>
            {"Search for Friends"}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={FriendsModalStyleSheet.cancelContainer}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text style={FriendsModalStyleSheet.cancelText}>{"Cancel"}</Text>
          </TouchableOpacity>
        </View>
        <View style={FriendsModalStyleSheet.inputFormContainer}>
          <TextInput
            style={FriendsModalStyleSheet.inputForm}
            placeholder={"> search new friends by name"}
            value={inputText}
            onChangeText={(text) => onTextChange(text)}
          />
          <TouchableOpacity
            style={FriendsModalStyleSheet.clearInputContainer}
            onPress={() => {
              setInputText("");
              setFilter([]);
            }}
          >
            <Ionicons
              size={15}
              style={FriendsModalStyleSheet.clearInputIcon}
              name="close-circle-outline"
            ></Ionicons>
          </TouchableOpacity>
        </View>
        {/*<Button onPress={() => search(inputText)} title={"Search"}></Button>*/}

        <FlatList
          style={searchFriendsStyleSheet.listItem}
          data={filter}
          renderItem={({ item }) => (
            <View style={searchListStyleSheet.wrapper}>
              <View style={searchListStyleSheet.avatarContainer}>
                <Avatar
                  containerStyle={{ marginLeft: 15 }}
                  size={20}
                  rounded={true}
                  source={{ uri: item.avatar }}
                />
              </View>
              <View style={searchListStyleSheet.nameContainer}>
                <Text style={searchListStyleSheet.nameText}>
                  {item.username}
                </Text>
              </View>
              <TouchableOpacity
                onPress={async () => {
                  if (!isFriend(item)) await addFriend(item.id);
                  else await deleteFriend(item.id);
                }}
              >
                {isFriend(item) ? (
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
