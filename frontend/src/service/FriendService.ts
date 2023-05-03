import { get_request_header, root_path } from "./global";

export const get_friends = async () => {
  const url = root_path + "user/friends";
  return await fetch(url, get_request_header(""))
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
