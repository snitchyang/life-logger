import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { IPost } from "../../interface";
import React, { useState } from "react";
import { Card, Text } from "@rneui/base";
import { UserHeader } from "./UserHeader";
import { PostActionSection } from "./PostActionSection";
import ImageViewer from "react-native-image-zoom-viewer";
import { IImageInfo } from "react-native-image-zoom-viewer/built/image-viewer.type";

interface Props {
  post: IPost;
}

const width = Dimensions.get("window").width;

export const Post = ({ post }: Props): JSX.Element => {
  const [images, setImages] = useState<IImageInfo[]>(
    post.images.map((item) => {
      return { url: item.path, freeHeight: true, freeWidth: true };
    })
  );
  const [openImage, setOpenImage] = useState(false);
  const [openImageIndex, setOpenImageIndex] = useState(0);
  return (
    <Card containerStyle={{ borderWidth: 1, borderRadius: 15 }}>
      <UserHeader date={post.date} user={post.user} />
      <Text
        style={{
          fontSize: 14,
          marginTop: 5,
          marginRight: 10,
        }}
      >
        {post.content}
      </Text>
      <FlatList
        data={post.images}
        numColumns={3}
        style={{ marginTop: 2 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ padding: 2 }}
            onPress={() => {
              setOpenImageIndex(index);
              setOpenImage(true);
            }}
          >
            <Image
              style={{ width: width * 0.26, height: width * 0.26 }}
              source={{ uri: item.path }}
              key={index}
            />
          </TouchableOpacity>
        )}
      />
      <PostActionSection post={post} />
      <Modal visible={openImage}>
        <ImageViewer
          imageUrls={images}
          index={openImageIndex}
          onClick={() => setOpenImage(false)}
          menuContext={{ saveToLocal: "保存", cancel: "取消" }}
        ></ImageViewer>
      </Modal>
    </Card>
  );
};
