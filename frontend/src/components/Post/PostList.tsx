import React, { useEffect, useState } from "react";
import { IPost } from "../../interface";
import { Post } from "./Post";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { GetPostList } from "../../service/PostService";
import { FAB } from "@rneui/themed";
import { PostAddPage } from "../../screens/Discovery/PostAddPage";

export const PostList = () => {
  const [maxPage, setMaxPage] = useState(1);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [postEnd, setPostEnd] = useState(false);

  async function getNewPostList(page) {
    await GetPostList(page).then((res) => {
      setPosts(res.data);
      setMaxPage(res.max);
      setRefreshing(false);
    });
  }

  useEffect(() => {
    getNewPostList(page);
  }, []);
  const [refreshing, setRefreshing] = useState(true);
  const [addPost, setAddPost] = useState(false);

  if (posts.length === 0) return <ActivityIndicator />;
  return (
    <View>
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
        onEndReachedThreshold={0.5}
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
      <TouchableOpacity
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          right: 20,
          top: 10,
        }}
      >
        <FAB
          icon={{ name: "add", color: "white" }}
          color={"black"}
          onPress={() => setAddPost(true)}
          size={"small"}
        />
      </TouchableOpacity>
      <PostAddPage
        visible={addPost}
        setVisible={setAddPost}
        getnewPostList={getNewPostList}
      />
    </View>
  );
};
