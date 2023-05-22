import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailedPage } from "../screens/Home/DiaryDetailPage";
import React from "react";
import Homepage from "../screens/Home/Diary";
import { Button } from "@rneui/base";
import { View } from "native-base";
import { ChangeImageInfo } from "../components/SideBar/UserInfo/InfoChange/ChangeImageInfo";

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={"CardHome"}
        component={Homepage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name={"Detail"}
        component={DetailedPage}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
