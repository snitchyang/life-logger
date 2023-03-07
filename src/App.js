import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from "./navigations/bottomNavigator";
import DrawerNavigator from "./navigations/drawerNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </ NavigationContainer>
    );
}
