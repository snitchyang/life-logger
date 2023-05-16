import { View } from "react-native";
import { IFriend } from "../../../../interface";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  me: number;
  friend: IFriend;
  friends: IFriend[];
  setFriends: Dispatch<SetStateAction<IFriend[]>>;
}

export const SearchFriendsListItem = ({
  me,
  friend,
  friends,
  setFriends,
}: Props) => {
  return <View></View>;
};
