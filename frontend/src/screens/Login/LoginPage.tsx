import React from "react";
import RegisterForm from "../../components/Login/LoginBox";
import { useEffect, useState } from "react/react.shared-subset";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  return await AsyncStorage.getItem("token").catch((err) => console.log(err));
};
export const LoginPage = ({ navigation }) => {
  // const [token, setToken] = useState<string>("");
  // useEffect(() => {
  //   setToken(getToken);
  // }, []);
  // if (token.length) {
  //   console.log(token);
  // }
  return <RegisterForm navigation={navigation} />;
};
