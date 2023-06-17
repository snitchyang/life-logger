import { IComment } from "../../interface";
import { Divider, Text } from "@rneui/themed";
import { View } from "react-native";
import React from "react";
import { getTimeDistance } from "../../service/TimeService";
import { OpenImage } from "../Image/OpenImage";

interface Comment {
  comment: IComment;
}

export const Comment = ({ comment }: Comment) => {
  4;
  return (
    <View style={{ marginTop: 3 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <OpenImage
          url={comment.user.avatar}
          style={{ width: 20, height: 20, borderRadius: 4 }}
        />
        <View style={{ marginLeft: 6, margin: "auto" }}>
          <Text style={{ fontSize: 12 }}>{comment.user.username}</Text>
          <Text
            style={{
              fontSize: 10,
            }}
          >
            {getTimeDistance(comment.date)}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 16, marginLeft: 26 }}>{comment.content}</Text>
      <Divider style={{ width: "90%" }} insetType={"middle"} />
    </View>
  );
};
