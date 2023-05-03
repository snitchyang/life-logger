import { FlatList, Image, View } from "react-native";
import { IPost } from "../../interface";
import React from "react";
import { Card, Text } from "@rneui/base";
import { UserHeader } from "./UserHeader";
import { PostActionSection } from "./PostActionSection";

interface Props {
  post: IPost;
}

export const Post = ({ post }: Props): JSX.Element => {
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
        renderItem={({ item, index }) => (
          <Image
            style={{ width: 100, height: 100 }}
            source={{ uri: item.path }}
            key={index}
          />
        )}
      />
      <PostActionSection post={post} />
    </Card>
  );
};
