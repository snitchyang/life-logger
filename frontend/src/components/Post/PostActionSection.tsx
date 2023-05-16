import React, { useState } from "react";
import { Text, View } from "react-native";
import { IPost } from "../../interface";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CommentsList } from "../Comment/CommentsList";
import { Input } from "@rneui/base";
import { AddComment, GetPost, LikePost } from "../../service/PostService";

interface PostActionSection {
  post: IPost;
}

export const PostActionSection = ({ post }: PostActionSection) => {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [liked, setLiked] = useState(post.liked);
  const addLike = async () => {
    setLikes(likes + 1);
    await LikePost(post.id, true);
  };
  const removeLike = async () => {
    setLikes(likes - 1);
    await LikePost(post.id, false);
  };
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [content, setContent] = useState("");
  const handleAddComment = async () => {
    setAddComment(false);
    await AddComment(post.id, content)
      .then(() => GetPost(post.id))
      .then((res) => setComments(res.comments));
  };
  const handleCancelComment = async () => {
    setAddComment(false);
  };
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <View style={{ paddingTop: 2 }}>
          <AntDesign
            name={liked ? "like1" : "like2"}
            color={liked ? "rgb(255,2,2)" : "rgb(0,0,0)"}
            onPress={async () => {
              setLiked(!liked);
              liked ? await removeLike() : await addLike();
            }}
            size={20}
          />
        </View>
        <View style={{ paddingLeft: 12, paddingTop: 1 }}>
          <Text style={{ fontSize: 15 }}>{likes}</Text>
        </View>
        <View style={{ paddingLeft: 20, paddingTop: 3 }}>
          <MaterialCommunityIcons
            name={addComment ? "comment-off-outline" : "comment-outline"}
            size={20}
            onPress={() => {
              setAddComment(!addComment);
            }}
          ></MaterialCommunityIcons>
        </View>
        <View style={{ paddingLeft: 15, paddingTop: 1 }}>
          <Text style={{ fontSize: 15 }}>{comments.length}</Text>
        </View>
        <View style={{ paddingLeft: 20 }}>
          <MaterialIcons
            name={showComments ? "expand-less" : "expand-more"}
            size={25}
            onPress={() => {
              setShowComments(!showComments);
            }}
          />
        </View>
      </View>
      <View style={{ paddingTop: 4 }}>
        {showComments && <CommentsList comments={comments} />}
      </View>
      <View style={{ paddingTop: 4 }}>
        {addComment && (
          <View style={{ flexDirection: "row" }}>
            <Input
              placeholder="评论一下"
              autoFocus={true}
              onChange={({ nativeEvent: { text } }) => {
                setContent(text);
              }}
              rightIcon={{
                name: "plussquare",
                color:
                  content.length === 0
                    ? "rgb(133,130,130)"
                    : "rgba(17,17,231,0.71)",
                size: 25,
                type: "antdesign",
                onPress: handleAddComment,
                disabled: content.length === 0,
              }}
              leftIcon={{
                name: "cancel",
                type: "material-community",
                size: 25,
                color: "rgb(218,18,18)",
                onPress: handleCancelComment,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
