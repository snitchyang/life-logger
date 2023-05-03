import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import "../I18n";
import { useTranslation } from "react-i18next";
import { COLOR } from "../constants";
import { ActionPage, DataPage, DiscoveryPage, PlanPage } from "../screens";
import { HomeStackScreen } from "./HomeStackNavigator";
import {Post} from "../components/Post/Post";

const bottomNavigator = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  const { t, i18n } = useTranslation();
  return (
    <bottomNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          color = focused ? COLOR.primary : "grey";
          size = 23;
          if (route.name === "Home") {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === "Content") {
            return (
              <Ionicons name="aperture-outline" size={size} color={color} />
            );
          } else if (route.name === "Plan") {
            return <Ionicons name="calendar" size={size} color={color} />;
          } else if (route.name === "Data") {
            return <Ionicons name="pie-chart" size={size} color={color} />;
          } else if (route.name === "Start") {
            return (
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  position: "relative",
                  bottom: 5,
                  backgroundColor: COLOR.primary,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 18 }}>{t("GO")}</Text>
              </View>
            );
          }
        },
        tabBarActiveTintColor: COLOR.primary,
        tabBarLabelStyle: { fontSize: 13 },
      })}
    >
      <bottomNavigator.Screen
        name="Home"
        options={{
          headerTitleAlign: "center",
          title: t("home"),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => navigation.openDrawer()}
            >
              <AntDesign name="user" size={24} color={COLOR.black} />
            </TouchableOpacity>
          ),
        }}
        component={HomeStackScreen}
      />
      <bottomNavigator.Screen
        name="Content"
        options={{ headerTitleAlign: "center", title: t("discovery") }}
        component={DiscoveryPage}
      />
      <bottomNavigator.Screen
        name="Start"
        options={{ headerStyle: { height: 0 }, title: "" }}
        component={ActionPage}
      />
      <bottomNavigator.Screen
        name="Plan"
        options={{ headerTitleAlign: "center", title: t("plan") }}
        component={PlanPage}
      />
      <bottomNavigator.Screen
        name="Data"
        options={{ headerTitleAlign: "center", title: t("data") }}
        component={DataPage}
      />
    </bottomNavigator.Navigator>
  );
}
