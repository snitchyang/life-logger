import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { IPost } from "../../interface";

export const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async () => {};

  useEffect(() => {}, []);
  return <View></View>;
};
