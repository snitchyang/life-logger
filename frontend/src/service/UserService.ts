import { IToken, IUser } from "../interface";
import { get_request_header, post_request_header, root_path } from "./global";

export const update_userinfo = async (user: IUser) => {
  const url = root_path + "user/self";
  await fetch(url, await post_request_header(JSON.stringify(user))).catch(
    (err) => console.error(err)
  );
};

export const update_userAvatar = async (avatar_base64: string) => {
  const url = root_path + "user/avatar";
  let form = new FormData();
  form.append("avatar_base64", avatar_base64);
  await fetch(url, await post_request_header(form)).catch((err) =>
    console.error(err)
  );
};

export const get_user_self = async (): Promise<IUser> => {
  const url = `${root_path}user/self`;
  const header: RequestInit = await get_request_header();
  return await fetch(url, header).then((response) => {
    return response.json();
  });
};

export const login_user = async (
  username: string,
  password: string
): Promise<IToken> => {
  const url = `${root_path}login`;
  let form = new FormData();
  form.append("username", username);
  form.append("password", password);
  // const body = JSON.stringify({ username: username, password: password });
  const header: RequestInit = {
    method: "POST",
    credentials: "include",
    body: form,
  };
  return await fetch(url, header)
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
