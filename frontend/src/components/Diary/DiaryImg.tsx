import React from "react";
import { Image, View } from "react-native";

interface Props {
  url: string;
}

export const DiaryImg = ({ url }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        right: 10,
        width: 100,
        height: 100,
      }}
    >
      <Image
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 10,
        }}
        source={{ uri: url }}
        alt="picture"
      />
    </View>
  );
};

export const DetailImg = ({ url }: Props) => {
  return (
    <Image
      style={{
        flex: 1,
        width: 100,
        height: 130,
        marginHorizontal: 5,
        marginVertical: 2,
      }}
      source={{ uri: url }}
      alt="picture"
    />
  );
};
