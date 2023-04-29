import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailedPage } from "../screens/Home/DiaryDetailPage";
import * as React from "react";
import { HomePage } from "../screens/Home/Homepage";

const HomeStack = createNativeStackNavigator();

export function HomeStackScreen(): JSX.Element {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={"CardHome"}
        component={HomePage}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name={"Detail"} component={DetailedPage} />
    </HomeStack.Navigator>
  );
}
