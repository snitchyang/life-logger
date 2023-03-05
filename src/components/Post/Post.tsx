import { View } from "react-native";
import { UserHeader } from "./UserHeader";
import { PostActionSection } from "./PostActionSection";
import { Link } from "@react-navigation/native";
import { IPost } from "../../interface";
import { Image, Card, Text } from "@rneui/base";
import { CommentsList } from "../Comment/CommentsList";
import { useEffect, useState } from "react";
import { comments } from "../../data/data";
import { CardImage } from "@rneui/base/dist/Card/Card.Image";

interface Post {
  post: IPost;
}

export const Post = ({ post }: Post): JSX.Element => {
  const [commentList, setComments] = useState([]);
  const getComments = () => {
    setComments(comments);
  };
  useEffect(() => getComments, []);
  return (
    <Card>
      {/*<Link to={`/posts/${post.id}`}>*/}
      <View style={{ flexDirection: "column" }}>
        <UserHeader
          date={post.date}
          user={post.user}
          location={post.location}
        />
      </View>
      {/*</Link>*/}
      <View style={{ paddingTop: 5 }}>
        <Text>{post.content}</Text>
      </View>
      <Image source={{ uri: post.image }}></Image>
      <PostActionSection post={post}></PostActionSection>
    </Card>
  );
};
