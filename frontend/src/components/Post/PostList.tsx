import React, { useEffect, useState } from "react";
import { IPost } from "../../interface";
import { Post } from "./Post";
import { FlatList, RefreshControl } from "react-native";
import { GetPostList } from "../../service/PostService";

export const PostList = () => {
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postEnd, setPostEnd] = useState(false);
  useEffect(() => {
    GetPostList(page).then((res) => {
      console.log();
      setPosts(res.data);
      setMaxPage(res.max);
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => {
        return <Post post={item} key={item.id} />;
      }}
      onEndReached={async () => {
        if (postEnd) return;
        if (page + 1 > maxPage) {
          setPostEnd(true);
          return;
        }
        setPage(page + 1);
        await GetPostList(page + 1).then((res) => {
          setPosts(posts.concat(res.data));
        });
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            GetPostList(1).then((res) => {
              setPosts(res.data);
              setMaxPage(res.max);
              setPage(1);
              setPostEnd(false);
              setRefreshing(false);
            });
          }}
        />
      }
      initialNumToRender={6}
      style={{ width: "98%" }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
