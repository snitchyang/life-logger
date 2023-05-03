import { IComment } from "../../interface";
import { FlatList, View } from "react-native";
import { Divider } from "@rneui/base";
import { Comment } from "./Comment";
import React, { useEffect, useState } from "react";

interface CommentsList {
  comments: IComment[];
}

export const CommentsList = ({ comments }: CommentsList): JSX.Element => {
  const [sortedComments, setComments] = useState<IComment[]>([]);
  useEffect(() => {
    let newComments = comments;
    newComments.sort((a: IComment, b: IComment) =>
      a.date > b.date ? -1 : a.date < b.date ? 1 : 0
    );
    setComments(newComments);
  }, [comments]);
  const renderItem = ({ item }) => {
    return (
      <View>
        <Divider />
        <Comment comment={item} />
      </View>
    );
  };
  return <FlatList data={sortedComments} renderItem={renderItem} />;
};
