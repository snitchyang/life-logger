import { IComment } from "../../interface";
import { Comment } from "./Comment";
import React from "react";
import Animated from "react-native-reanimated";

interface CommentsList {
  comments: IComment[];
}

export const CommentsList = ({ comments }: CommentsList): JSX.Element => {
  const renderItem = ({ item, index }) => {
    return <Comment comment={item} key={index} />;
  };
  // <AnimatedScrollView />;
  return <Animated.FlatList data={comments} renderItem={renderItem} />;
};
