import AsyncStorage from "@react-native-async-storage/async-storage";

export const root_path: string = "http://124.221.102.250:8000/api/";

export const test_token: string =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg1MDI5NTQ2LCJpYXQiOjE2ODQxNjU1NDYsImp0aSI6ImY2OGJkOGU0MGQ2YzRlZWRhZTQ1ZWMxMmI0MTkyZTg3IiwidXNlcl9pZCI6MX0.z1RBg7FQiweJwwxS3LBVeNjrRXXuuAHAxtwsCleuP2k";

export const post_request_header = async (body: string | FormData) => {
  const token = await AsyncStorage.getItem("token");
  let request: RequestInit = {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + test_token,
    },
  };
  return request;
};

export const put_request_header = async (body: string) => {
  const token = await AsyncStorage.getItem("token");
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
