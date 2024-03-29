import { post_request_header, root_path } from "./global";
// export const LoginPost = async (
//     username : string,
//     password : string
//     )=> {
//   return await fetch(
//     `${root_path}login`,
//     post_request_header(
//         JSON.stringify({
//                 username: username,
//                 password: password,
//             }),)
//   )
//     .then((res) => res.json())
//     .catch((err) => console.error(err));
// };

export const RegisterPost = async (
  username: string,
  password: string,
  email: string,
  avatar: string,
  school: string,
  phoneNumber: number,
  gender: string
): Promise<{ message: string; success: boolean }> => {
  const body = JSON.stringify({
    username: username,
    password: password,
    email: email,
    avatar: avatar,
    school: school,
    phone_number: phoneNumber,
    gender: gender,
  });
  const url = `${root_path}register`;
  return await fetch(url, await post_request_header(body))
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
