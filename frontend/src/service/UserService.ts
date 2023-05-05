import { IUser } from "../interface";
import {
  get_request_header,
  post_request_header,
  put_request_header,
  root_path,
} from "./global";

export const update_userinfo = async (user: IUser) => {
  const url = root_path + "user/self";
  const body = JSON.stringify(user);
  await fetch(url, post_request_header(body));
};

export const get_user_self = async (): Promise<IUser> => {
  const url = `${root_path}user/self`;
  return await fetch(url, get_request_header()).then((response) =>
    response.json()
  );
};
