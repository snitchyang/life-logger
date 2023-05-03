import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { IPost } from "../../interface";
import { get_request_header, root_path } from "../../service/global";
import { Post } from "./Post";

export const PostList = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async (): Promise<IPost[]> => {
    return await fetch(root_path + "posts", get_request_header()).then((res) =>
      res.json()
    );
  };
  const [postEnd, setPostEnd] = useState(false);
  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
      if (res.length !== 10) setPostEnd(true);
    });
  }, []);
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => {
        return <Post post={item} key={item.id} />;
      }}
      onEndReached={async () => {
        // if (postEnd) return;
        // setPage(page + 1);
        // await GetPostList(page + 1).then((res) => {
        //   setPosts(posts.concat(res));
        //   if (res.length !== 10) setPostEnd(true);
        // });
      }}
      initialNumToRender={10}
      style={{ width: "95%" }}
    />
  );
};
