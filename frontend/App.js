import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigations/drawerNavigator";
import MainNavigator from "./src/navigations/mainNavigator";
function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

export default App;
