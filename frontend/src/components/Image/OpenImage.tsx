import React, { useState } from "react";
import {
  Image,
  ImageStyle,
  Modal,
  StyleProp,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

interface Props {
  url: string;
  style: StyleProp<ImageStyle>;
}

export const OpenImage = ({ url, style }: Props) => {
  const [openImage, setOpenImage] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setOpenImage(true)}>
        <Image source={{ uri: url }} style={style} />
      </TouchableOpacity>
      <Modal visible={openImage}>
        <ImageViewer
          imageUrls={[{ url: url, freeWidth: true, freeHeight: true }]}
          onClick={() => setOpenImage(false)}
          menuContext={{ saveToLocal: "保存", cancel: "取消" }}
        />
      </Modal>
    </View>
  );
};
