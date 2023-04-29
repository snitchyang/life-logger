import { Tab } from "@rneui/base";
import React, { type Dispatch, useEffect, useState } from "react";
import WebView, { type WebViewMessageEvent } from "react-native-webview";
import { Alert, View } from "react-native";
import { chartHTML, mapHTML } from "./WebViewHTML";
import { getCurrentPositionAsync, type LocationObject } from "expo-location";

export const Statistic = () => {
  const [index, setIndex] = useState(0);
  const AMAP_KEY = "751df63e511df1470816c41d9a4f0ae4"; // 申请的高德api密钥
  const AMAP_PREFIX = "https://restapi.amap.com/v3"; // 高德api前缀
  const [location, setLocation]: [LocationObject, Dispatch<LocationObject>] =
    useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [meg, setMsg] = useState("h");
  useEffect(() => {
    (async () => {
      const location: LocationObject = await getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Tab
        value={index}
        onChange={(i: number) => {
          setIndex(i);
        }}
      >
        <Tab.Item title={"Chart"}></Tab.Item>
        <Tab.Item title={"Map"}></Tab.Item>
      </Tab>
      <View style={{ flex: 1 }}>
        {index === 0 ? (
          <WebView
            originWhitelist={["*"]}
            source={{
              html: chartHTML,
            }}
          />
        ) : (
          <WebView
            originWhitelist={["*"]}
            geolocationEnabled={true}
            javaScriptEnabled={true}
            cacheEnabled={true}
            domStorageEnabled={true}
            onMessage={(event: WebViewMessageEvent) => {
              Alert.alert(event.nativeEvent.data);
            }}
            source={{ html: mapHTML }}
          />
        )}
      </View>
    </View>
  );
};
