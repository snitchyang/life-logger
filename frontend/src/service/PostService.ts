import { get_request_header, post_request_header, root_path } from "./global";
import { IMessage, IPost } from "../interface";

export const AddImage = async (
  image: string
): Promise<{ message: string; success: boolean; url: string }> => {
  return await fetch(
    `${root_path}post/image/add`,
    await post_request_header(JSON.stringify({ image: image }))
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const AddImageList = async (images: string[]): Promise<string[]> => {
  let result: string[] = [];
  for (const image of images) {
    await fetch(
      `${root_path}post/image/add`,
      await post_request_header(JSON.stringify({ image: image }))
    )
      .then((res) => res.json())
      .then((res) => result.push(res.url))
      .catch((err) => console.error(err));
  }
  while (result.length !== images.length) {}
  return result;
};
export const AddComment = async (
  post_id: number,
  content: string
): Promise<IMessage> => {
  return await fetch(
    `${root_path}comment/add`,
    await post_request_header(
      JSON.stringify({
        post: post_id,
        content: content,
      })
    )
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const AddPost = async (
  image: string[],
  location: string,
  content: string
) => {
  return await fetch(
    `${root_path}post/add`,
    await post_request_header(
      JSON.stringify({ content: content, location: location, image: image })
    )
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
