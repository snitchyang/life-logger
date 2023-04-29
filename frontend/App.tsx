import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./src/navigations/drawerNavigator";

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
