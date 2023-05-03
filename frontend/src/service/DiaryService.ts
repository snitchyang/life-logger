import { get_request_header, root_path, test_token } from "./global";
import { IDiary, ITag } from "../interface";

export const get_diary = async (): Promise<IDiary[]> => {
  const url = root_path + "diaries";
  return await fetch(url, get_request_header(""))
    .then((response) => response.json())
    .catch((err) => console.error(err));
};

export const get_tags = async (): Promise<ITag[]> => {
  const url = root_path + "tags";
  return await fetch(url, get_request_header(""))
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
