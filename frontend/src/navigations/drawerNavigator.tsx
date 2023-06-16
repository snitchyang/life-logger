import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import BottomTabNavigator from "./bottomNavigator";
import "../I18n";
import { useTranslation } from "react-i18next";
import { COLOR } from "../constants";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import SettingsPage from "../screens/Settings/SettingsPage";
import { UserInfo } from "../screens/Profiles/UserInfoRoute";
import { FriendsRoute } from "../components/SideBar/Friends/FriendsRoute";
import { IUser } from "../interface";
import { get_user_self } from "../service/UserService";

const drawerNavigator = createDrawerNavigator();
export default function DrawerNavigator() {
  const { t } = useTranslation();
  const [user, setUser] = useState<IUser>();
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
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <View
              style={{
                height: 250,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri: user.avatar }}
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 130 / 2,
                  borderColor: COLOR.black,
                  borderWidth: 1,
                  top: -30,
                }}
              />
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  top: -10,
                }}
              >
                {user.username}
              </Text>
            </View>
            <View>
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>
        );
      }}
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
        // component={UserInfoRoute}
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
