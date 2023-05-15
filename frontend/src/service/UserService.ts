import { IUser } from "../interface";
import { get_request_header, post_request_header, root_path } from "./global";

export const update_userinfo = async (user: IUser, avatar_base64: any) => {
  const url = root_path + "user/self";
  if (avatar_base64) {
    const upload_url = root_path + "user/avatar";
    let upload_data = new FormData();
    upload_data.append("avatar_base64", avatar_base64);
    await fetch(upload_url, post_request_header(upload_data)).then(() => {
      fetch(url, post_request_header(JSON.stringify(user)));
    });
  } else {
    await fetch(url, post_request_header(JSON.stringify(user)));
  }
};

export const get_user_self = async (): Promise<IUser> => {
  const url = `${root_path}user/self`;
  return await fetch(url, get_request_header()).then((response) =>
    response.json()
  );
};
