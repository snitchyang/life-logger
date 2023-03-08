import React  from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import BottomTabNavigator from "./bottomNavigator";
import '../I18n'
import {useTranslation} from "react-i18next";
import {COLOR} from "../constants";
import customDrawer from "./customDrawer";
import {AntDesign, FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {StyleSheet} from "react-native";
import {View} from "react-native";

const drawerNavigator = createDrawerNavigator();
export default function DrawerNavigator() {
    const {t} = useTranslation();
    return(
        <drawerNavigator.Navigator
            screenOptions={{
                headerShown:false,
                drawerActiveBackgroundColor: COLOR.black,
                drawerActiveTintColor: COLOR.white,
                drawerInactiveTintColor: COLOR.primary,
                drawerItemStyle:{
                    height:50
                },
                drawerLabelStyle:{
                    fontSize:16,
                    marginLeft: -5,
                },
            }}
            drawerContent={customDrawer}>
            <drawerNavigator.Screen
                name={t("home")}
                component={BottomTabNavigator}
                options={{
                    drawerIcon: (focused) => {
                        let color=focused.focused?COLOR.white:COLOR.black;
                        return <FontAwesome name="home" size={24} color={color} style={styles.IconStyle}/>
                    }
                }}/>
            <drawerNavigator.Screen
                name={t("setting")}
                component={BottomTabNavigator}
                options={{
                    drawerIcon: (focused) => {
                        let color=focused.focused?COLOR.white:COLOR.black;
                        return <Ionicons name="settings" size={24} color={color} style={styles.IconStyle}/>
                    }
                }}
            />
            <drawerNavigator.Screen
                name={t("profiles")}
                component={BottomTabNavigator}
                options={{
                    drawerIcon: (focused) => {
                        let color=focused.focused?COLOR.white:COLOR.black;
                        return <FontAwesome name="user" size={24} color={color} style={styles.IconStyle}/>
                    }
                }}
            />
            <drawerNavigator.Screen
                name={t("friends")}
                component={BottomTabNavigator}
                options={{
                    drawerIcon: (focused) => {
                        let color=focused.focused?COLOR.white:COLOR.black;
                        return <FontAwesome5 name="user-friends" size={24} color={color} style={styles.IconStyle}/>
                    }
                }}
            />
        </drawerNavigator.Navigator>
    )
}

const styles = StyleSheet.create({
    IconStyle:{
        width: 40,
        paddingLeft: 10,
    }
})
