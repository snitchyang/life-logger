import React  from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import BottomTabNavigator from "./bottomNavigator";
import '../I18n'
import {useTranslation} from "react-i18next";

const drawerNavigator = createDrawerNavigator();
export default function DrawerNavigator() {
    const {t} = useTranslation();
    return(
        <drawerNavigator.Navigator screenOptions={{headerShown:false}}>
            <drawerNavigator.Screen name={t("home")} component={BottomTabNavigator}/>
            <drawerNavigator.Screen name={t("setting")} component={BottomTabNavigator}/>
            <drawerNavigator.Screen name={t("profiles")} component={BottomTabNavigator}/>
            <drawerNavigator.Screen name={t("friends")} component={BottomTabNavigator}/>
        </drawerNavigator.Navigator>
    )
}
