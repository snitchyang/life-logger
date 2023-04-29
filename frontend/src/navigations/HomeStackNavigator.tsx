import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DetailedPage } from "../screens/Home/DiaryDetailPage";
import * as React from "react";
import Homepage from "../screens/Home/Homepage";
import { useState } from "react";
import { diaries } from "../data/data";
import { ScrollView, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { diaryStyleSheet } from "../components/Diary/CardView/DiaryStyleSheet";
import { DiaryCard } from "../components/Diary/CardView/DiaryCard";

const HomeStack = createNativeStackNavigator();
export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={"CardHome"} component={Homepage} options={{headerShown:false}}/>
      <HomeStack.Screen name={"Detail"} component={DetailedPage} />
    </HomeStack.Navigator>
  );
}

