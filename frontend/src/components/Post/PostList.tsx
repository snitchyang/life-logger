import React, { useEffect, useState } from "react";
import { VirtualizedList } from "react-native";
import { IPost } from "../../interface";
import { get_request_header, root_path } from "../../service/global";
import { Post } from "./Post";

export const PostList = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const getPosts = async (page: number): Promise<IPost[]> => {
    return await fetch(
      root_path + "posts?page=" + page.toString(),
      get_request_header()
    ).then((res) => res.json());
  };

  useEffect(() => {
    getPosts(page).then((res) => setPosts(res));
  }, []);
  return (
    <VirtualizedList
      data={posts}
      renderItem={({ item }) => {
        return <Post post={item} />;
      }}
      initialNumToRender={5}
      getItemCount={(data: IPost[]) => data.length}
      getItem={(data: IPost[], index: number) => data[index]}
      style={{ width: "90%" }}
    />
  );
};
