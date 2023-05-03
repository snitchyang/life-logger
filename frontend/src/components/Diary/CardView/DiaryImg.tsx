import React from "react";
import { Image } from "react-native";

interface Props {
  path: string;
}

export const DiaryImg = ({ path }: Props) => {
  return (
    <Image
      style={{
        flex: 1,
        paddingLeft: 10,
        marginRight: 20,
        width: "100%",
        height: "100%",
        // width: 100,
        // height: 100,
      }}
      source={{ uri: path }}
      alt="picture"
    />
  );
};

export const DetailImg = ({ path }: Props) => {
  return (
    <Image
      style={{
        flex: 1,
        width: 100,
        height: 130,
      }}
      source={{ uri: path }}
      alt="picture"
    />
  );
};
