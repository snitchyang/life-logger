import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { Input, Card, Button } from "@rneui/base";
import { FontAwesome } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { IUser } from "../../interface";
import { RegisterPost } from "../../service/LoginService";

export const RegisterBox = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const handleRegister = async () => {
    await RegisterPost(
      username,
      password,
      email,
      null,
      null,
      Number(phoneNumber),
      gender
    ).then((res) => {
      if (res.message) {
        Alert.alert("注册成功！");
        navigation.navigate("Login");
      } else {
        // 处理未成功获取到token的情况
        Alert.alert("信息错误");
      }
    });
  };
  return (
    <View style={{ marginTop: 50 }}>
      <View style={{ height: 150 }}>
        <Image
          source={require("../../assets/Logo/Logo.png")}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <Card containerStyle={{ borderRadius: 20 }} wrapperStyle={{}}>
        <View
          style={{
            position: "relative",
            alignItems: "center",
          }}
        >
          <Input
            inputContainerStyle={{
              marginLeft: 5,
              marginRight: 10,
              marginTop: 20,
              height: 30,
            }}
            inputStyle={{ marginLeft: 15, width: 15, height: 15 }}
            rightIconContainerStyle={{
              margin: 0,
              width: 40,
            }}
            rightIcon={
              <FontAwesome
                name="user-o"
                color="black"
                size={15}
                margin={0}
                align="center"
              />
            }
            placeholder="用户名"
            defaultValue={username}
            onChangeText={(text) => setUsername(text)}
            labelStyle={{ backgroundColor: "0xfff" }}
          />
          <Input
            inputContainerStyle={{ marginLeft: 5, marginRight: 10, height: 30 }}
            inputStyle={{ marginLeft: 15, width: 15, height: 15 }}
            rightIconContainerStyle={{
              margin: 0,
              width: 40,
            }}
            rightIcon={
              <FontAwesome
                name="phone"
                color="black"
                size={15}
                margin={0}
                align="center"
              />
            }
            placeholder="手机号"
            defaultValue={phoneNumber}
            keyboardType="numeric"
            onChangeText={(text) => setPhoneNumber(text)}
            labelStyle={{ backgroundColor: "0xfff" }}
          />
          <Input
            secureTextEntry
            inputContainerStyle={{ marginLeft: 5, marginRight: 10, height: 30 }}
            inputStyle={{ marginLeft: 15, width: 15, height: 15 }}
            rightIconContainerStyle={{
              margin: 0,
              width: 40,
            }}
            rightIcon={
              <FontAwesome
                name="lock"
                color="black"
                size={15}
                margin={0}
                align="center"
              />
            }
            placeholder="请输入您的密码"
            defaultValue={password}
            onChangeText={(text) => setPassword(text)}
            labelStyle={{ backgroundColor: "0xfff" }}
          />
          <Input
            secureTextEntry
            inputContainerStyle={{ marginLeft: 5, marginRight: 10, height: 30 }}
            inputStyle={{ marginLeft: 15, width: 15, height: 15 }}
            rightIconContainerStyle={{
              margin: 0,
              width: 40,
            }}
            rightIcon={
              <FontAwesome
                name="lock"
                color="black"
                size={15}
                margin={0}
                align="center"
              />
            }
            placeholder="请确认您的密码"
            defaultValue={confirmpassword}
            onChangeText={(text) => setconfirmPassword(text)}
            labelStyle={{ backgroundColor: "0xfff" }}
          />
          <Input
            inputContainerStyle={{ marginLeft: 5, marginRight: 10, height: 30 }}
            inputStyle={{ marginLeft: 15, width: 15, height: 15 }}
            rightIconContainerStyle={{
              margin: 0,
              width: 40,
            }}
            rightIcon={
              <FontAwesome
                name="venus-mars"
                color="black"
                size={15}
                margin={0}
                align="center"
              />
            }
            placeholder="性别"
            defaultValue={gender}
            onChangeText={(text) => setGender(text)}
            labelStyle={{ backgroundColor: "0xfff" }}
          />
          <Input
            inputContainerStyle={{ marginLeft: 5, marginRight: 10, height: 30 }}
            inputStyle={{ marginLeft: 15, width: 15, height: 15 }}
            rightIconContainerStyle={{
              margin: 0,
              width: 40,
            }}
            rightIcon={
              <Fontisto
                name="email"
                color="black"
                size={15}
                margin={0}
                align="center"
              />
            }
            placeholder="邮箱"
            defaultValue={email}
            onChangeText={(text) => setEmail(text)}
            labelStyle={{ backgroundColor: "0xfff" }}
          />
        </View>
      </Card>
      <Button
        title="注册"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 10,
          width: 300,
          height: 40,
          alignSelf: "center",
        }}
        containerStyle={{
          width: 300,
          marginVertical: 10,
          alignItems: "center",
          alignSelf: "center",
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={handleRegister}
      />
    </View>
  );
};

export default RegisterBox;
