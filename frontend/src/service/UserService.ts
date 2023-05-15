import { IToken, IUser } from "../interface";
import { get_request_header, post_request_header, root_path } from "./global";

export const update_userinfo = async (user: IUser, avatar_base64: any) => {
  const url = root_path + "user/self";
  if (avatar_base64) {
    const upload_url = root_path + "user/avatar";
    let upload_data = new FormData();
    upload_data.append("avatar_base64", avatar_base64);
    await fetch(upload_url, await post_request_header(upload_data)).then(
      async () => {
        await fetch(url, await post_request_header(JSON.stringify(user)));
      }
    );
  } else {
    await fetch(url, await post_request_header(JSON.stringify(user)));
  }
};

export const get_user_self = async (): Promise<IUser> => {
  const url = `${root_path}user/self`;
  return await fetch(url, await get_request_header()).then((response) =>
    response.json()
  );
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
