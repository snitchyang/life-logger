import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
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
import { useState } from "react";

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
  const [filterData, setFilterData] = useState(diaries);
  const [allData, setAllData] = useState(diaries);
  const [searchText, setSearchText] = useState("");

  function ContentFilter({ item, text }) {
    let title = item.title;
    let content = item.content;
    return title.indexOf(text) > -1 || content.indexOf(text) > -1;
  }

  function TagFilter({ item, t }) {
    // item is an ITag object
    let tags = item.tag;
    for (const tag of tags) {
      if (tag.content.indexOf(t) > -1) return true;
    }
    return false;
  }

  function FilterFun(text) {
    if (text) {
      text = text.toLowerCase();
      let textGroup = text.trim().split(/\s+/);
      let filter = [];
      let newData = undefined;
      for (const text of textGroup) {
        // filter of data, #xxx means it's a tag
        console.log(text);
        newData = undefined;
        if (text.at(0) === "#") {
          console.log("tag");
          let t = text.substring(1);
          newData = allData.filter((item) => TagFilter({ item, t }));
        } else {
          newData = allData.filter((item) => ContentFilter({ item, text }));
        }
        if (newData) {
          for (const data of newData) {
            if (!filter.includes(data)) filter.push(data);
          }
        }
      }
      console.log(filter.length);
      setFilterData(filter);
      setSearchText(text);
    } else {
      setFilterData(allData);
      setSearchText(text);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, maxHeight: 30 }}>
        <TextInput
          id="searchInput"
          style={{ paddingLeft: 18 }}
          autoCorrect={false}
          onChangeText={(text) => FilterFun(text)}
          placeholder="type here..."
          value={searchText}
        />
      </View>
      <View style={{ flex: 10, minHeight: 200 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {filterData.map((item) => (
              <View
                style={diaryStyleSheet.wrapper}
                onTouchEnd={() => {
                  navigation.navigate("Detail", { diary: item });
                }}
              >
                <DiaryCard diary={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
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
