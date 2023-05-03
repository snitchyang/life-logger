import { FlatList, Image, View } from "react-native";
import { IPost } from "../../interface";
import React, { useState } from "react";
import { Card, Text } from "@rneui/base";
import { UserHeader } from "./UserHeader";
import { PostActionSection } from "./PostActionSection";

interface Props {
  post: IPost;
}

export const Post = ({ post }: Props): JSX.Element => {
  const getNewPost = async () => {};
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.liked);

  const addLike = () => {
    setLikes(likes + 1);
  };
  const removeLike = () => {
    setLikes(likes - 1);
  };
  const [showComments, setShowComments] = useState(false);

  return (
    <Card wrapperStyle={{ width: "100%" }}>
      <View style={{ flexDirection: "column" }}>
        <UserHeader date={post.date} user={post.user} />
      </View>
      <View style={{ marginTop: 5 }}>
        <Text>{post.content}</Text>
      </View>
      <FlatList
        data={post.image}
        renderItem={({ item }) => (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.path }}
          />
        )}
      />
      <PostActionSection post={post} />
    </Card>
  );
};
