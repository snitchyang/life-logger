import { IComment } from "../../interface";
import { Card, Text } from "@rneui/base";
import { UserHeader } from "../Post/UserHeader";
import { comments } from "../../data/data";
import { timeToNowChinese } from "../timeHandle";
import { View } from "react-native";

interface Comment {
  comment: IComment;
}

export const Comment = ({ comment }: Comment) => {
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ paddingRight: 10, fontSize: 16 }}>
          {comment.user.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            paddingTop: 2,
          }}
        >
          {timeToNowChinese(comment.date)}
          {"前"}
        </Text>
      </View>
      <Text>{comment.content}</Text>
    </View>
  );
};
