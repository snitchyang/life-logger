import { IComment } from "../../interface";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  View,
} from "react-native";
import { Card, Divider, Text } from "@rneui/base";
import { Comment } from "./Comment";
import { useState } from "react";

interface CommentsList {
  comments: IComment[];
}

export const CommentsList = ({ comments }: CommentsList): JSX.Element => {
  const [sortedComments, setComments] = useState(() =>
    comments.sort((a: IComment, b: IComment) =>
      a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    )
  );
  const renderItem = (item: ListRenderItemInfo<IComment>) => {
    return (
      <View>
        <Divider />
        <Comment comment={item.item} />
      </View>
    );
  };
  return <FlatList data={sortedComments} renderItem={renderItem} />;
};
