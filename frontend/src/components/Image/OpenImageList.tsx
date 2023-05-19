import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

interface Props {
  urls: string[];
}

const width = Dimensions.get("window").width;
export const OpenImageList = ({ urls }: Props) => {
  const [openImage, setOpenImage] = useState(false);
  const [openImageIndex, setOpenImageIndex] = useState(0);

  return (
    <View>
      <FlatList
        data={urls}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ margin: "0.5%" }}
            onPress={() => {
              setOpenImageIndex(index);
              setOpenImage(true);
            }}
          >
            <Image
              style={{ width: width * 0.29, height: width * 0.29 }}
              source={{ uri: item }}
              key={index}
            />
          </TouchableOpacity>
        )}
      />
      <Modal visible={openImage}>
        <ImageViewer
          index={openImageIndex}
          imageUrls={urls.map((value) => {
            return {
              url: value,
              freeHeight: true,
              freeWidth: true,
            };
          })}
          onClick={() => setOpenImage(false)}
        />
      </Modal>
    </View>
  );
};
