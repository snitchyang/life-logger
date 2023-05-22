import {
  get_request_header,
  post_request_header,
  put_request_header,
  root_path,
} from "./global";
import { IDiary, ITag } from "../interface";

export const get_diary = async (): Promise<IDiary[]> => {
  const url = root_path + "diaries";
  return await fetch(url, await get_request_header())
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const get_tags = async (): Promise<ITag[]> => {
  const url = root_path + "tags";
  return await fetch(url, await get_request_header())
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const add_diary = async (
  diary: IDiary
): Promise<{ message: string }> => {
  const url = `${root_path}diary/add`;
  let body = JSON.stringify({
    imgs: diary.images.map((img) => img.path),
    ...diary,
  });
  return await fetch(url, await post_request_header(body))
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const add_diary_image = async (images: string[]): Promise<string[]> => {
  let result: string[] = [];
  for (const image of images) {
    await fetch(
      `${root_path}diary/image/add`,
      await post_request_header(JSON.stringify({ image: image }))
    )
      .then((res) => res.json())
      .then((res) => result.push(res.url))
      .catch((err) => console.error(err));
  }
  while (result.length !== images.length) {}
  return result;
};
