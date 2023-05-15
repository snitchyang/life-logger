

import { get_request_header, post_request_header, root_path } from "./global";
import {IMessage, IUser} from "../interface";
export const LoginPost = async (
    username : string,
    password : string
    )=> {
  return await fetch(
    `${root_path}login`,
    post_request_header(
        JSON.stringify({
                username: username,
                password: password,
            }),)
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const RegisterPost = async (
  username: string,
  password: string,
  email: string,
  avatar: string,
  school: string,
  phoneNumber: number,
  gender: string
)=> {
  return await fetch(
    `${root_path}post/like`,
    post_request_header(JSON.stringify({
        username: username,
        password: password,
        email: email,
        avatar: avatar,
        school: school,
        phone_number: phoneNumber,
        gender: gender }))
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};