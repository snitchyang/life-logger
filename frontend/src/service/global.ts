import { IDiary } from "../interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
// export const root_path: string = "http://10.0.2.2:8000/api/";
export const root_path: string = "http://124.221.102.250:8000/api/";

export const test_token: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg0MTYwODUwLCJpYXQiOjE2ODQxNjA1NTAsImp0aSI6IjdlYTM3YzE4OTgxZTRlODg4N2ZjNjExNmI0ZWU3MGJmIiwidXNlcl9pZCI6MX0.SpuZwVI3E_UbodO1PIOaMrOGEm5-3tXIgNigRqlpY-o";

export const post_request_header = async (body: string | FormData) => {
  const token = await AsyncStorage.getItem("token");
  let request: RequestInit = {
    method: "POST",
    body: body,
    headers: {
      Authorization: "Bearer " + test_token,
    },
  };
  return request;
};

export const put_request_header = async (body: string) => {
  const token = await AsyncStorage.getItem("token");
  console.log(token);
  let request: RequestInit = {
    method: "PUT",
    body: body,
    headers: {
      Authorization: "Token " + token,
    },
    credentials: "include",
  };
  return request;
};
export const delete_request_header = async (body: string) => {
  const token = await AsyncStorage.getItem("token");
  console.log(token);
  let request: RequestInit = {
    method: "DELETE",
    body: body,
    headers: {
      Authorization: "Token " + token,
    },
    credentials: "include",
  };
  return request;
};

export const get_request_header = async () => {
  const token = await AsyncStorage.getItem("token");
  let request: RequestInit = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + test_token,
    },
  };
  return request;
};
