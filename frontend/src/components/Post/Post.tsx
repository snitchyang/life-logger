import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { IPost } from "../../interface";
import React, { useState } from "react";
import { Text } from "@rneui/base";
import { UserHeader } from "./UserHeader";
import { PostActionSection } from "./PostActionSection";
import ImageViewer from "react-native-image-zoom-viewer";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";

interface Props {
  post: IPost;
}

const width = Dimensions.get("window").width;

export const Post = ({ post }: Props): JSX.Element => {
  const images: IImageInfo[] = post.images.map((item) => {
    return { url: item.path, freeHeight: true, freeWidth: true };
  });
  const [addComment, setAddComment] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openImageIndex, setOpenImageIndex] = useState(0);
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
        <FlatList
          data={post.images}
          numColumns={3}
          style={{ marginTop: 2 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ marginLeft: "0.5%", marginRight: "0.5%" }}
              onPress={() => {
                setOpenImageIndex(index);
                setOpenImage(true);
              }}
            >
              <Image
                style={{ width: width * 0.3, height: width * 0.3 }}
                source={{ uri: item.path }}
                key={index}
              />
            </TouchableOpacity>
          )}
        />
        <PostActionSection
          post={post}
          addComment={addComment}
          setAddComment={setAddComment}
        />
        <Modal visible={openImage}>
          <ImageViewer
            imageUrls={images}
            index={openImageIndex}
            onClick={() => setOpenImage(false)}
            menuContext={{ saveToLocal: "保存", cancel: "取消" }}
          ></ImageViewer>
        </Modal>
      </View>
      <View style={{ height: 10 }} />
    </View>
  );
};
