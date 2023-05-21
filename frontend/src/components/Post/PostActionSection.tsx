import React, { Dispatch, SetStateAction, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
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
    setContent("");
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
          style={{ marginLeft: 20, margin: "auto", padding: 2 }}
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
            style={{ marginLeft: "73%", padding: 2 }}
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
                color={"green"}
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
