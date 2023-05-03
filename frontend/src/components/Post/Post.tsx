import { Button, View } from "react-native";
import { UserHeader } from "./UserHeader";
import { Link } from "@react-navigation/native";
import { IPost } from "../../interface";
import React, { useState } from "react";
import { Text } from "@rneui/base";

interface Props {
  post: IPost;
}

export const Post = ({ post }: Props): JSX.Element => {
  const getNewPost = async () => {};
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.liked);

  const addLike = () => {
    setLikes(likes + 1);
  };
  const removeLike = () => {
    setLikes(likes - 1);
  };
  const [showComments, setShowComments] = useState(false);

  return (
    <View onTouchEnd={() => console.log(post.id)}>
      <Link to={`/posts/${post.id}`}>
        <UserHeader date={post.date} user={post.user} />
        <Text>{post.content}</Text>
      </Link>
      <View>
        <Button
          title={"like"}
          onPress={() => {
            if (liked) {
              removeLike();
            } else {
              addLike();
            }
            setLiked(!liked);
          }}
        ></Button>
        {likes}
        <Button
          title={"showComments"}
          disabled={!showComments}
          onPress={() => {
            setShowComments(!showComments);
          }}
        ></Button>
        {/*<CommentsList></CommentsList>*/}
      </View>
    </View>
  );
};
