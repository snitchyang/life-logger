import React from "react";
import { Modal } from "@ant-design/react-native";

interface Props {
  friendName: string;
  friendID: number;
  deleteFriend: any;
}

export const DeleteFriendModal = ({
  friendName,
  friendID,
  deleteFriend,
}: Props) => {
  return Modal.alert("Confirm", "delete " + friendName + "?", [
    { text: "Cancel", onPress: () => console.log("cancel"), style: "cancel" },
    { text: "OK", onPress: () => deleteFriend(friendID) },
  ]);
};
