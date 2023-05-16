import {
  get_request_header,
  post_request_header,
  root_path,
  test_token,
} from "./global";
import { IMessage, IPost } from "../interface";

export const AddComment = async (
  post_id: number,
  content: string
): Promise<IMessage> => {
  return await fetch(`${root_path}comment/add`, {
    method: "POST",
    body: JSON.stringify({ post: post_id, content: content }),
    headers: {
      Authorization: "Bearer " + test_token,
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const LikePost = async (
  post_id: number,
  like: boolean
): Promise<IMessage> => {
  return await fetch(
    `${root_path}post/like`,
    await post_request_header(JSON.stringify({ post: post_id, like: like }))
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const GetPost = async (post_id: number): Promise<IPost> => {
  return await fetch(
    `${root_path}post/${post_id.toString()}`,
    await get_request_header()
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const GetPostList = async (
  page: number
): Promise<{ data: IPost[]; max: number }> => {
  return await fetch(
    `${root_path}posts?page=${page.toString()}`,
    await get_request_header()
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
