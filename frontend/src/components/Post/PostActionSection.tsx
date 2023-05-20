import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IPost } from "../../interface";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CommentsList } from "../Comment/CommentsList";
import { Button, Input } from "@rneui/themed";
import { AddComment, GetPost, LikePost } from "../../service/PostService";

interface PostActionSection {
  post: IPost;
  addComment: boolean;
  setAddComment: Dispatch<SetStateAction<boolean>>;
}

export const PostActionSection = ({
  post,
  addComment,
  setAddComment,
}: PostActionSection) => {
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
  const [content, setContent] = useState("");
  const handleAddComment = async () => {
    setAddComment(false);
    await AddComment(post.id, content)
      .then(() => GetPost(post.id))
      .then((res) => setComments(res.comments));
  };
  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <AntDesign
            name={liked ? "like1" : "like2"}
            color={liked ? "rgb(255,2,2)" : "rgb(0,0,0)"}
            onPress={async () => {
              setLiked(!liked);
              liked ? await removeLike() : await addLike();
            }}
            size={20}
            style={{ margin: "auto", padding: 2 }}
          />
        </TouchableOpacity>

        <Text style={{ fontSize: 15, marginLeft: 6, margin: "auto" }}>
          {likes}
        </Text>
        <MaterialCommunityIcons
          name={addComment ? "comment-off-outline" : "comment-outline"}
          size={20}
          onPress={() => {
            setAddComment(!addComment);
          }}
          style={{ paddingLeft: 20, margin: "auto", padding: 2 }}
        />
        <Text style={{ fontSize: 15, marginLeft: 6, margin: "auto" }}>
          {comments.length}
        </Text>
        <TouchableOpacity>
          <MaterialIcons
            name={showComments ? "expand-less" : "expand-more"}
            size={30}
            onPress={() => {
              setShowComments(!showComments);
            }}
            style={{ paddingLeft: 20, padding: 2 }}
          />
        </TouchableOpacity>
      </View>
      {showComments && <CommentsList comments={comments} />}
      {addComment && (
        <View>
          <Input
            style={{ marginTop: 4 }}
            placeholder={"评论一下"}
            autoFocus={true}
            onChange={({ nativeEvent: { text } }) => {
              setContent(text);
            }}
            rightIcon={
              <Button
                title={"发送"}
                size={"sm"}
                color={"primary"}
                disabled={content.length === 0}
                onPress={handleAddComment}
              />
            }
          />
        </View>
      )}
    </View>
  );
};
const action_color = "rgba(230,230,230,0.8)";
const styleSheet = StyleSheet.create({
  action_box: {
    marginTop: 4,
    backgroundColor: "rgba(230,230,230,0.8)",
    padding: 5,
  },
});
