import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IComment, IUser } from "../../interface";
import { Input, Text } from "@rneui/base";
import { View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface AddComment {
  setComment: Dispatch<SetStateAction<IComment[]>>;
  comments: IComment[];
  setAddComment: Dispatch<SetStateAction<boolean>>;
  user: IUser;
}

export const AddComment = ({
  setComment,
  comments,
  setAddComment,
  user,
}: AddComment) => {
  const [content, setContent] = useState("");

  const handleAddComment = () => {
    setComment(() => {
      comments.push({
        id: comments.length === 0 ? 0 : comments[comments.length - 1].id + 1,
        content: content,
        user: user,
        date: new Date(),
      });
      return comments;
    });
    setAddComment(false);
  };
  const handleCancelComment = () => {
    setAddComment(false);
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <Input
        placeholder="评论一下"
        autoFocus={true}
        // onSubmitEditing={({ nativeEvent: { text } }) => setContent(text)}
        onChange={({ nativeEvent: { text } }) => {
          setContent(text);
        }}
        rightIcon={{
          name: "plussquare",
          color: content.length === 0 ? "gray" : "blue",
          size: 25,
          type: "antdesign",
          onPress: handleAddComment,
          disabled: content.length === 0,
        }}
        leftIcon={{
          name: "cancel",
          type: "material-community",
          size: 25,
          color: "red",
          onPress: handleCancelComment,
        }}
      />
    </View>
  );
};
