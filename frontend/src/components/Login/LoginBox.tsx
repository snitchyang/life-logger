import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Button, Input } from "@rneui/base";
import { COLOR } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login_user } from "../../service/UserService";

const RegisterForm = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    // navigation.navigate("Home");
    login_user(username, password).then(async (res) => {
      if (res.access) {
        console.log(res.access);
        await AsyncStorage.multiSet([
          ["token", res.access],
          ["refresh", res.refresh],
        ]).then(navigation.navigate("Home"));
        // navigation.navigate("Home");
      } else {
        // 处理未成功获取到token的情况
        Alert.alert(res.error);
      }
    });
  };
  const doReg = () => {
    navigation.navigate("Register");
  };
  const findAccount = () => {};
  return (
    <View>
      <View style={styles.loginSection}>
        <View style={{ height: 150, marginTop: 90 }}>
          <Image
            source={require("../../assets/Logo/Logo.png")}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </View>
        <Input
          inputContainerStyle={{
            marginLeft: 5,
            marginRight: 10,
            marginTop: 20,
          }}
          inputStyle={{ marginLeft: 15 }}
          leftIconContainerStyle={{
            backgroundColor: "#ddd",
            margin: 0,
            width: 40,
          }}
          leftIcon={
            <FontAwesome
              name="user"
              color="black"
              size={20}
              margin={0}
              align="center"
            />
          }
          placeholder="用户名"
          defaultValue={username}
          style={styles.loginInput}
          onChangeText={(text) => setUsername(text)}
          labelStyle={{ backgroundColor: "0xfff" }}
        />
        <Input
          secureTextEntry
          inputContainerStyle={{ marginLeft: 5, marginRight: 10 }}
          inputStyle={{ marginLeft: 15 }}
          leftIconContainerStyle={{
            backgroundColor: "#ddd",
            margin: 0,
            width: 40,
          }}
          leftIcon={
            <FontAwesome
              name="lock"
              color="black"
              size={20}
              margin={0}
              align="center"
            />
          }
          placeholder="密码"
          defaultValue={password}
          style={styles.loginInput}
          onChangeText={(text) => setPassword(text)}
          labelStyle={{ backgroundColor: "0xfff" }}
        />
        <Button
          title="LOG IN"
          buttonStyle={{
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 10,
            height: 40,
          }}
          containerStyle={{
            width: 300,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={handleLogin}
        />
        <View style={styles.subButton}>
          <Text style={styles.subButtonText} onPress={() => doReg()}>
            免费注册
          </Text>
          <Text style={styles.subButtonText} onPress={() => findAccount()}>
            找回密码
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: COLOR.THEME_BACKGROUND,
  },
  loginIcon: {
    color: COLOR.THEME_TEXT,
    size: 14,
  },
  loginSection: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: "500",
    color: COLOR.THEME_LABEL,
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  subButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "flex-end",
  },
  subButtonText: {
    color: COLOR.THEME_TEXT,
    fontSize: 14,
    textDecorationLine: "underline",
    alignSelf: "flex-end",
  },
  loginInput: {
    marginBottom: 8,
  },
  message: {
    marginTop: 16,
    color: COLOR.THEME_TEXT,
    fontSize: 14,
  },
});
