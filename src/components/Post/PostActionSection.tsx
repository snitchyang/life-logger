import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { currentUser } from "../../data/data";
import { posts, comments } from "../../data/data";
import { IPost } from "../../interface";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { CommentsList } from "../Comment/CommentsList";
import { AddComment } from "../Comment/AddComment";

interface PostActionSection {
  post: IPost;
}

export const PostActionSection = ({ post }: PostActionSection) => {
  const getNewPost = (): IPost => {
    return posts.find((item: IPost) => post.id === item.id);
  };
  const [newPost, setNewPost] = useState(post);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  // useEffect(() => {
  //   setInterval(() => {
  //     setNewPost(getNewPost());
  //     setLikes(post.likes);
  //     setComments(post.comments);
  //   }, 2000);
  // }, []);
  const [liked, setLiked] = useState(
    post.liker.find((item) => item === currentUser) !== undefined
  );
  const addLike = () => {
    setLikes(likes + 1);
    post.likes += 1;
  };
  const removeLike = () => {
    setLikes(likes - 1);
    post.likes -= 1;
  };
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row", paddingTop: 5 }}>
        <View style={{ paddingTop: 2 }}>
          <AntDesign
            name={liked ? "like1" : "like2"}
            color={liked ? "red" : "black"}
            onPress={() => {
              liked ? removeLike() : addLike();
              setLiked(!liked);
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
      <View style={{ paddingTop: 2 }}>
        {showComments && <CommentsList comments={comments} />}
      </View>
      <View style={{ paddingTop: 2 }}>
        {addComment && (
          <AddComment
            setComment={setComments}
            comments={comments}
            setAddComment={setAddComment}
            user={currentUser}
          />
        )}
      </View>
    </View>
  );
};
