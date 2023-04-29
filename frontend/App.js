
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from "./src/navigations/bottomNavigator";
import DrawerNavigator from "./src/navigations/drawerNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </ NavigationContainer>
    );
}
