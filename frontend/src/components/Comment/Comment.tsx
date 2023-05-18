import { IComment } from "../../interface";
import { Text } from "@rneui/base";
import { Image, View } from "react-native";
import React from "react";
import { getTimeDistance } from "../../service/TimeService";

interface Comment {
  comment: IComment;
}

export const Comment = ({ comment }: Comment) => {
  return (
    <View style={{ marginTop: 3 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{ uri: comment.user.avatar }}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            borderRadius: 3,
            margin: "auto",
          }}
        />
        <Text style={{ marginRight: 10, fontSize: 12, margin: "auto" }}>
          {comment.user.username}
        </Text>
        <Text
          style={{
            fontSize: 12,
            margin: "auto",
          }}
        >
          {getTimeDistance(comment.date)}
        </Text>
      </View>
      <Text style={{ fontSize: 13, marginTop: 3 }}>{comment.content}</Text>
    </View>
  );
};
