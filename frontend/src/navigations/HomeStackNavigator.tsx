import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailedPage } from "../screens/Home/DiaryDetailPage";
import {LoginPage} from "../screens/Login/LoginPage";
import React from "react";
import Homepage from "../screens/Home/Homepage";

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={"CardHome"}
        component={Homepage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name={"Detail"} component={DetailedPage} />
    </HomeStack.Navigator>
  );
}
