import * as React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import "./src/I18n";
import { useTranslation } from "react-i18next";
import theme from "./theme.json";
import { DiaryCard } from "./src/components/Diary/DiaryCard";
import { DetailedPage } from "./src/components/Diary/DiaryDetail";
import { diaryStyleSheet } from "./src/components/Diary/DiaryStyleSheet";
import { diaries } from "./src/data/data";

const bottomNavigator = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={"CardHome"} component={Homepage} />
      <HomeStack.Screen name={"Detail"} component={DetailedPage} />
    </HomeStack.Navigator>
  );
}

function Homepage({ navigation }) {
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {diaries.map((item) => (
          <View
            style={diaryStyleSheet.wrapper}
            onTouchEnd={() => {
              navigation.navigate("Detail", { id: item.id });
            }}
          >
            <DiaryCard id={item.id} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function ContentPage() {
  const { t, i18n } = useTranslation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>this is the content page</Text>
      <Button
        color={theme.theme}
        onPress={() =>
          i18n.changeLanguage(i18n.language === "en" ? "zh" : "en")
        }
      >
        {t("click here to change language")}
      </Button>
    </View>
  );
}

function PlanPage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>this is the plan page</Text>
    </View>
  );
}

function DataPage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>this is the data page</Text>
    </View>
  );
}

function ActionPage() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>this is the action page</Text>
    </View>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();
  return (
    <NavigationContainer>
      <bottomNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? theme.theme : "grey";
            size = 23;
            if (route.name === "Home") {
              return <Ionicons name="home" size={size} color={color} />;
            } else if (route.name === "Content") {
              return (
                <Ionicons name="aperture-outline" size={size} color={color} />
              );
            } else if (route.name === "Plan") {
              return <Ionicons name="calendar" size={size} color={color} />;
            } else if (route.name === "data") {
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
                    backgroundColor: theme.theme,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    {t("GO")}
                  </Text>
                </View>
              );
            }
          },
          tabBarActiveTintColor: theme.theme,
          tabBarLabelStyle: { fontSize: 13 },
        })}
      >
        <bottomNavigator.Screen
          name="Home"
          options={{ headerTitleAlign: "center", title: t("home") }}
          component={HomeStackScreen}
        />
        <bottomNavigator.Screen
          name="Content"
          options={{ headerTitleAlign: "center", title: t("discovery") }}
          component={ContentPage}
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
    </NavigationContainer>
  );
}
