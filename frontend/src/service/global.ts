import { IDiary, ITag } from "../interface";

export const root_path: string = "http://10.0.0.2:8000/api/";

export const test_token: string = "3518f3f1a74627cb896612ac4634b82ef6d2848f";

export const post_request_header = (body: string) => {
  let request: RequestInit = {
    method: "POST",
    body: body,
    headers: {
      Authorization: "token " + test_token,
    },
  };
  return request;
};

export const put_request_header = (body: string) => {
  let request: RequestInit = {
    method: "PUT",
    body: body,
    headers: {
      Authorization: "token " + test_token,
    },
  };
  return request;
};

export const get_request_header = (body: string) => {
  let request: RequestInit = {
    method: "GET",
    body: body,
    headers: {
      Authorization: "token " + test_token,
    },
  };
  return request;
};
export const empty_diary: IDiary = {
  id: 0,
  date: new Date(),
  title: "",
  content: "",
  images: [],
  tag: [],
};
