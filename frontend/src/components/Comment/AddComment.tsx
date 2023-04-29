import React, { type Dispatch, type SetStateAction, useState } from "react";
import { type IComment, type IUser } from "../../interface";
import { Input } from "@rneui/base";
import { View } from "react-native";

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
}: AddComment): JSX.Element => {
  const [content, setContent] = useState("");

  const handleAddComment = (): void => {
    setComment(() => {
      comments.push({
        id: comments.length === 0 ? 0 : comments[comments.length - 1].id + 1,
        content,
        user,
        date: new Date(),
      });
      return comments;
    });
    setAddComment(false);
  };
  const handleCancelComment = (): void => {
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
          color:
            content.length === 0 ? "rgb(133,130,130)" : "rgba(17,17,231,0.71)",
          size: 25,
          type: "antdesign",
          onPress: handleAddComment,
          disabled: content.length === 0,
        }}
        leftIcon={{
          name: "cancel",
          type: "material-community",
          size: 25,
          color: "rgb(218,18,18)",
          onPress: handleCancelComment,
        }}
      />
    </View>
  );
};
