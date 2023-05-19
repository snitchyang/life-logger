import React, { useEffect, useState } from "react";
import { IPost } from "../../interface";
import { Post } from "./Post";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { GetPostList } from "../../service/PostService";

export const PostList = () => {
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postEnd, setPostEnd] = useState(false);
  useEffect(() => {
    GetPostList(page).then((res) => {
      setPosts(res.data);
      setMaxPage(res.max);
    });
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  if (posts.length === 0) return <ActivityIndicator />;
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => {
        return <Post post={item} key={item.id} />;
      }}
      onEndReached={async ({ distanceFromEnd }) => {
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
      onEndReachedThreshold={200}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await GetPostList(1).then(async (res) => {
              await setPosts(res.data);
              setMaxPage(res.max);
              setPage(1);
              setPostEnd(false);
              setRefreshing(false);
            });
          }}
        />
      }
      initialNumToRender={6}
      style={{ width: "100%" }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
