import { get_request_header, post_request_header, root_path } from "./global";
import { IFriend, ResponseFriends } from "../interface";

export const get_friends = async (): Promise<ResponseFriends> => {
  const url = root_path + "user/friends";
  return await fetch(url, get_request_header())
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const search_friends = async (
  friendName: string
): Promise<IFriend[]> => {
  const url = root_path + "search/friends";
  let json = {
    friend: friendName,
  };
  let body = JSON.stringify(json);
  return await fetch(url, post_request_header(body))
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
