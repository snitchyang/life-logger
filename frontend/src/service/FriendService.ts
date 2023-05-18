import {
  delete_request_header,
  get_request_header,
  post_request_header,
  root_path,
} from "./global";
import { IFriend, ResponseFriends } from "../interface";

export const get_friends = async (): Promise<ResponseFriends> => {
  const url = root_path + "user/friends";
  return await fetch(url, await get_request_header())
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const search_friends = async (
  friendName: string
): Promise<IFriend[]> => {
  const url = root_path + "friends/search";
  let body = JSON.stringify({
    friend: friendName,
  });
  return await fetch(url, await post_request_header(body))
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.error(err));
};

export const follow_friends = async (
  friendID: number
): Promise<{ message: string }> => {
  const url = root_path + "user/friends";
  let json = { friend: friendID };
  let body = JSON.stringify(json);
  return await fetch(url, await post_request_header(body))
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const delete_friends = async (
  friendID: number
): Promise<{ message: string; success: boolean }> => {
  const url = root_path + "user/friends";
  let json = { friend: friendID };
  let body = JSON.stringify(json);
  return await fetch(url, await delete_request_header(body))
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
