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
      <View style={{ marginTop: 5, marginLeft: 10, marginRight: 10 }}>
        <Text>{post.content}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={post.images}
          numColumns={3}
          renderItem={({ item, index }) => (
            <View style={{ padding: 5 }}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: item.path }}
                key={index}
              />
            </View>
          )}
        />
      </View>
      <PostActionSection post={post} />
    </Card>
  );
};
