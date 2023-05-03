import { get_request_header, post_request_header, root_path } from "./global";
import { IMessage, IPost } from "../interface";

export const AddComment = async (
  post_id: number,
  content: string
): Promise<IMessage> => {
  return await fetch(
    `${root_path}comment/add`,
    post_request_header(JSON.stringify({ post: post_id, content: content }))
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const LikePost = async (
  post_id: number,
  like: boolean
): Promise<IMessage> => {
  return await fetch(
    `${root_path}post/like`,
    post_request_header(JSON.stringify({ post: post_id, like: like }))
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const GetPost = async (post_id: number): Promise<IPost> => {
  return await fetch(
    `${root_path}post/${post_id.toString()}`,
    get_request_header()
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const GetPostList = async (): Promise<IPost[]> => {
  return await fetch(`${root_path}posts`, get_request_header())
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
