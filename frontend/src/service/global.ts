import { IDiary } from "../interface";

export const root_path: string = "http://124.221.102.250:8000/api/";

export const test_token: string = "2459348ef925bceb7724005daa096bdff199ee46";

export const post_request_header = (body: string | FormData) => {
  let request: RequestInit = {
    method: "POST",
    body: body,
    headers: {
      Authorization: "Token " + test_token,
      // "Content-Type": "application/json",
    },
    credentials: "include",
  };
  return request;
};

export const put_request_header = (body: string) => {
  let request: RequestInit = {
    method: "PUT",
    body: body,
    headers: {
      Authorization: "Token " + test_token,
    },
    credentials: "include",
  };
  return request;
};
export const delete_request_header = (body: string) => {
  let request: RequestInit = {
    method: "DELETE",
    body: body,
    headers: {
      Authorization: "Token " + test_token,
    },
    credentials: "include",
  };
  return request;
};

export const get_request_header = () => {
  let request: RequestInit = {
    method: "GET",
    headers: {
      Authorization: "Token " + test_token,
    },
    credentials: "include",
  };
  return request;
};
// export const empty_diary: IDiary = {
//   id: 0,
//   date: new Date(),
//   title: "",
//   content: "",
//   images: [],
//   tag: [],
// };
