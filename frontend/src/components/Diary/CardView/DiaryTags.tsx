import { Text, View } from "react-native";
import React from "react";

interface IDiaryTags {
  id: number;
  tag_name: string;
}

export const DiaryTags = ({ id, tag_name }: IDiaryTags) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#90a0c2",
        borderBottomWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 20,
        width: 70,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginLeft: 5,
        backgroundColor: "#FFF",
      }}
    >
      <Text
        style={{
          justifyContent: "flex-start",
          fontStyle: "italic",
          fontSize: 10,
        }}
      >
        {"# " + tag_name}
      </Text>
    </View>
  );
};
