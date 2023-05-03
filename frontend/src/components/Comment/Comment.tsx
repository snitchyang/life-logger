import { IComment } from "../../interface";
import { Text } from "@rneui/base";
import { Image, View } from "react-native";
import React from "react";

interface Comment {
  comment: IComment;
}

export const Comment = ({ comment }: Comment) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: comment.user.avatar }}
          style={{ width: 15, marginRight: 15 }}
        />
        <Text style={{ marginRight: 10, fontSize: 16 }}>
          {comment.user.username}
        </Text>
        <Text
          style={{
            fontSize: 12,
            paddingTop: 2,
          }}
        >
          {comment.date.toString()}
          {"前"}
        </Text>
      </View>
      <Text>{comment.content}</Text>
    </View>
  );
};
