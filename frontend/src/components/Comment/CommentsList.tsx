import { IComment } from "../../interface";
import { FlatList } from "react-native";
import { Comment } from "./Comment";
import React from "react";

interface CommentsList {
  comments: IComment[];
}

export const CommentsList = ({ comments }: CommentsList): JSX.Element => {
  const renderItem = ({ item, index }) => {
    return <Comment comment={item} key={index} />;
  };
  return <FlatList data={comments} renderItem={renderItem} />;
};
