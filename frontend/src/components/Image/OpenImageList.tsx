import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import { IDiary, IImage } from "../../interface";
import { Button, Dialog, Text } from "@rneui/themed";

interface Props {
  image: IImage[];
  setImage?: (img: IImage[]) => void;
}

const width = Dimensions.get("window").width;
export const OpenImageList = ({ image, setImage }: Props) => {
  const [openImage, setOpenImage] = useState(false);
  const [openImageIndex, setOpenImageIndex] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [opImg, setOpImg] = useState<IImage | null>(null);
  return (
    <View>
      <FlatList
        data={image}
        numColumns={3}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{ margin: "0.5%" }}
            onPress={() => {
              setOpenImageIndex(index);
              setOpenImage(true);
            }}
            onLongPress={() => {
              if (setImage) {
                setOpImg(item);
                setDeleteDialog(true);
              }
            }}
          >
            <Image
              style={{ width: width * 0.29, height: width * 0.29 }}
              source={{ uri: item.path }}
              key={index}
            />
          </TouchableOpacity>
        )}
      />
      <Modal visible={openImage}>
        <ImageViewer
          index={openImageIndex}
          imageUrls={image
            .map((img) => img.path)
            .map((value) => {
              return {
                url: value,
                freeHeight: true,
                freeWidth: true,
              };
            })}
          onClick={() => setOpenImage(false)}
        />
      </Modal>
      <Dialog
        isVisible={deleteDialog}
        style={{ alignItems: "center", alignContent: "center" }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16 }}>{"是否删除该照片"}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <Button
            icon={{ name: "close" }}
            color={"rgb(218,218,218)"}
            onPress={() => {
              setDeleteDialog(false);
            }}
          ></Button>
          <Button
            icon={{ name: "done", color: "white" }}
            color={"rgb(0,0,0)"}
            onPress={() => {
              if (setImage) {
                setImage(image.filter((img) => img !== opImg));
                setOpImg(null);
                setDeleteDialog(false);
              }
            }}
          ></Button>
        </View>
      </Dialog>
    </View>
  );
};
