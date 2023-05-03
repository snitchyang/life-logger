import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { IPost } from "../../interface";
import { get_request_header, root_path } from "../../service/global";
import { Post } from "./Post";

export const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async (): Promise<IPost[]> => {
    return await fetch(root_path + "posts", get_request_header()).then((res) =>
      res.json()
    );
  };

  useEffect(() => {
    getPosts().then((res) => setPosts(res));
  }, []);
  return (
    <View>
      <FlatList data={posts} renderItem={({ item }) => <Post post={item} />} />
    </View>
  );
};
