import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigator from "./bottomNavigator";
import "../I18n";
import { useTranslation } from "react-i18next";
import { COLOR } from "../constants";
import customDrawer from "./customDrawer";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import SettingsPage from "../screens/Settings/SettingsPage";
import { UserInfo } from "../screens/Profiles/UserInfoRoute";
import { FriendsRoute } from "../components/SideBar/Friends/FriendsRoute";
import { IFriend } from "../interface";
import { get_user_self } from "../service/UserService";

const drawerNavigator = createDrawerNavigator();
export default function DrawerNavigator() {
  const { t } = useTranslation();
  const [user, setUser] = useState<IFriend>(undefined);
  useEffect(() => {
    get_user_self()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.error(err));
  }, []);
  if (!user) return <View></View>;
  return (
    <drawerNavigator.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLOR.black,
        drawerActiveTintColor: COLOR.white,
        drawerInactiveTintColor: COLOR.primary,
        drawerItemStyle: {
          height: 50,
        },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -5,
        },
      }}
      drawerContent={customDrawer}
    >
      <drawerNavigator.Screen
        name={t("home")}
        component={BottomTabNavigator}
        options={{
          drawerIcon: (focused) => {
            let color = focused.focused ? COLOR.white : COLOR.black;
            return (
              <FontAwesome
                name="home"
                size={24}
                color={color}
                style={styles.IconStyle}
              />
            );
          },
        }}
      />
      <drawerNavigator.Screen
        name={t("setting")}
        component={SettingsPage}
        options={{
          headerShown: true,
          drawerIcon: (focused) => {
            let color = focused.focused ? COLOR.white : COLOR.black;
            return (
              <Ionicons
                name="settings"
                size={24}
                color={color}
                style={styles.IconStyle}
              />
            );
          },
        }}
      />
      <drawerNavigator.Screen
        name={t("profiles")}
        component={UserInfo}
        initialParams={{ user: user }}
        options={{
          drawerIcon: (focused) => {
            let color = focused.focused ? COLOR.white : COLOR.black;
            return (
              <FontAwesome
                name="user"
                size={24}
                color={color}
                style={styles.IconStyle}
              />
            );
          },
        }}
      />
      <drawerNavigator.Screen
        name={t("friends")}
        component={FriendsRoute}
        initialParams={{ user: user }}
        options={{
          drawerIcon: (focused) => {
            let color = focused.focused ? COLOR.white : COLOR.black;
            return (
              <FontAwesome5
                name="user-friends"
                size={24}
                color={color}
                style={styles.IconStyle}
              />
            );
          },
        }}
      />
    </drawerNavigator.Navigator>
  );
}

const styles = StyleSheet.create({
  IconStyle: {
    width: 40,
    paddingLeft: 10,
  },
});
