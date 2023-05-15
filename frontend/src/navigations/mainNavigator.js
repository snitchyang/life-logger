import React from "react";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import {LoginPage} from "../screens/Login/LoginPage";
import "../I18n";
import DrawerNavigator from "./drawerNavigator";
import { useTranslation } from "react-i18next";
import { COLOR } from "../constants";
import customDrawer from "./customDrawer";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import SettingsPage from "../screens/Settings/SettingsPage";
import { UserInfo } from "../screens/Profiles/UserInfoRoute";
import { users } from "../data/data";
import { FriendsRoute } from "../components/SideBar/Friends/FriendsRoute";
import {RegisterPage} from "../screens/Login/RegisterPage";

const mainNavigator = createNativeStackNavigator();
export default function MainNavigator(){
    return (
        <mainNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <mainNavigator.Screen
                name="Login"
                component={LoginPage}/>
            <mainNavigator.Screen
                name="Home"
                component={DrawerNavigator}/>
            <mainNavigator.Screen
                name="Register"
                component={RegisterPage}/>
        </mainNavigator.Navigator>
    )
}