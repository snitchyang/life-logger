import * as React from "react";
import {Text, View, TouchableOpacity, LogBox, Image} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from "@expo/vector-icons";
import {Button} from "@rneui/base";
import "./src/I18n";
import {useTranslation} from "react-i18next";
import theme from "./theme.json";
import {Posts} from "./src/components/Post/Posts";
import {Statistic} from "./src/components/Chart/Statistic";
import {useEffect, useState} from "react";
import {Plan} from "./src/components/Plan";
import "reflect-metadata"

const Stack = createNativeStackNavigator();
const bottomNavigator = createBottomTabNavigator();


function Homepage() {
    const {t, i18n} = useTranslation();
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
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

function ContentPage() {
    return (
        <View>
            <Posts/>
        </View>
    );
}

function PlanPage() {
    return <Plan></Plan>;
}

function DataPage() {
    return <Statistic/>;
}

function ActionPage() {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text>this is the action page</Text>
        </View>
    );
}

export default function App() {
    const {t, i18n} = useTranslation();
    return (
        <NavigationContainer>
            <bottomNavigator.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        color = focused ? theme.theme : "grey";
                        size = 23;
                        if (route.name === "Home") {
                            return <Ionicons name="home" size={size} color={color}/>;
                        } else if (route.name === "Content") {
                            return (
                                <Ionicons name="aperture-outline" size={size} color={color}/>
                            );
                        } else if (route.name === "Plan") {
                            return <Ionicons name="calendar" size={size} color={color}/>;
                        } else if (route.name === "data") {
                            return <Ionicons name="calender" size={size} color={color}/>;
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
                                    <Text style={{color: "white", fontSize: 18}}>
                                        {t("GO")}
                                    </Text>
                                </View>
                            );
                        }
                    },
                    tabBarActiveTintColor: theme.theme,
                    tabBarLabelStyle: {fontSize: 13},
                })}
            >
                <bottomNavigator.Screen
                    name="Home"
                    options={{headerTitleAlign: "center", title: t("home")}}
                    component={Homepage}
                />
                <bottomNavigator.Screen
                    name="Content"
                    options={{headerTitleAlign: "center", title: t("discovery")}}
                    component={ContentPage}
                />
                <bottomNavigator.Screen
                    name="Start"
                    options={{headerStyle: {height: 0}, title: ""}}
                    component={ActionPage}
                />
                <bottomNavigator.Screen
                    name="Plan"
                    options={{headerTitleAlign: "center", title: t("plan")}}
                    component={PlanPage}
                />
                <bottomNavigator.Screen
                    name="Data"
                    options={{headerTitleAlign: "center", title: t("data")}}
                    component={DataPage}
                />
            </bottomNavigator.Navigator>
        </NavigationContainer>
    );
}


