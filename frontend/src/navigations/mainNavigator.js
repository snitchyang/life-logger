import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "../screens/Login/LoginPage";
import "../I18n";
import DrawerNavigator from "./drawerNavigator";
import { RegisterPage } from "../screens/Login/RegisterPage";

const mainNavigator = createNativeStackNavigator();
export default function MainNavigator() {
  return (
    <mainNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <mainNavigator.Screen name="Login" component={LoginPage} />
      <mainNavigator.Screen name="Home" component={DrawerNavigator} />
      <mainNavigator.Screen name="Register" component={RegisterPage} />
    </mainNavigator.Navigator>
  );
}
