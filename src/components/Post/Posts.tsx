import { VirtualizedList, ListRenderItemInfo } from "react-native";
import { IPost } from "../../interface";
import { Post } from "./Post";
import { useEffect, useState } from "react";
import { posts } from "../../data/data";

export const Posts = () => {
  const renderNum = 5;
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [sortedPosts, setPosts] = useState(
    posts.sort((a: IPost, b: IPost) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
  );
  return (
    <VirtualizedList
      data={sortedPosts}
      renderItem={(item: ListRenderItemInfo<IPost>) => {
        return <Post post={item.item} />;
      }}
      initialNumToRender={5}
      getItemCount={(data: IPost[]) => data.length}
      getItem={(data: IPost[], index: number) => data[index]}
    />
  );
};
