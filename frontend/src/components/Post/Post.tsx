import { Dimensions, View } from "react-native";
import { IPost } from "../../interface";
import React, { useState } from "react";
import { Text } from "@rneui/themed";
import { UserHeader } from "./UserHeader";
import { PostActionSection } from "./PostActionSection";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";
import { OpenImageList } from "../Image/OpenImageList";

interface Props {
  post: IPost;
}

const width = Dimensions.get("window").width;

export const Post = ({ post }: Props): JSX.Element => {
  const images: IImageInfo[] = post.images.map((item) => {
    return { url: item.path, freeHeight: true, freeWidth: true };
  });
  const [addComment, setAddComment] = useState(false);
  return (
    <View style={{}}>
      <View
        style={{
          backgroundColor: "rgba(255,255,255,0.91)",
          padding: 10,
        }}
      >
        <UserHeader date={post.date} user={post.user} />
        <Text
          style={{
            fontSize: 18,
            marginTop: 5,
            marginRight: 10,
          }}
          onPress={() => setAddComment(!addComment)}
        >
          {post.content}
        </Text>
        <View style={{ marginTop: 2 }}>
          <OpenImageList urls={post.images.map((value) => value.path)} />
        </View>
        <PostActionSection
          post={post}
          addComment={addComment}
          setAddComment={setAddComment}
        />
      </View>
      <View style={{ height: 10 }} />
    </View>
  );
};
