import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { IPost } from "../../interface";
import { get_request_header, root_path } from "../../service/global";
import { Post } from "./Post";
import { GetPostList } from "../../service/PostService";

export const PostList = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async (page: number): Promise<IPost[]> => {
    return await fetch(
      root_path + "posts?page=" + page.toString(),
      get_request_header()
    ).then((res) => res.json());
  };
  const [postEnd, setPostEnd] = useState(false);
  useEffect(() => {
    getPosts(page).then((res) => {
      setPosts(res);
      if (res.length !== 10) setPostEnd(true);
    });
  }, []);
  return (
    <FlatList
      data={posts}
      renderItem={({ item, index }) => {
        return <Post post={item} key={item.id} />;
      }}
      onEndReached={async () => {
        if (postEnd) return;
        setPage(page + 1);
        await GetPostList(page + 1).then((res) => {
          setPosts(posts.concat(res));
          if (res.length !== 10) setPostEnd(true);
        });
      }}
      initialNumToRender={10}
      // getItemCount={(data: IPost[]) => data.length}
      // getItem={(data: IPost[], index: number) => data[index]}
      style={{ width: "95%" }}
    />
  );
};
