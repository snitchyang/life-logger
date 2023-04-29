import { useEffect, useState } from "react";
import { Button, View } from "react-native";
import { curUserID, posts } from "../../data/data";
import { type IPost } from "../../interface";

interface Props {
  postID: number;
}

export const PostActionSection = ({ postID }: Props) => {
  const getNewPost = (): IPost => {
    return posts.find((item) => postID === item.id);
  };
  const [post, setPost] = useState(() => getNewPost());
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    setInterval(() => {
      setPost(getNewPost());
      setLikes(post.likes);
      setComments(post.comments);
    }, 2000);
  }, []);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (post.liker.find((item) => item.id === curUserID) !== undefined) {
      setLiked(true);
    }
  });
  const addLike = () => {
    setLikes(likes + 1);
    post.likes += 1;
  };
  const removeLike = () => {
    setLikes(likes - 1);
    post.likes -= 1;
  };
  const [showComments, setShowComments] = useState(false);
  return (
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
      {/* <CommentsList></CommentsList> */}
    </View>
  );
};
