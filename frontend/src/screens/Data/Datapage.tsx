import React, { useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { root_path } from "../../service/global";
import { Tab } from "@rneui/base";

function DataPage() {
  const [duration, setDuration] = useState("week");
  const [index, setIndex] = useState(1);
  return (
    <View style={{ flex: 1 }}>
      <Tab value={index}>
        <Tab.Item
          onPressOut={() => {
            setDuration("week");
            setIndex(0);
          }}
          key={0}
        >
          {"一周"}
        </Tab.Item>
        <Tab.Item
          onPressOut={() => {
            setDuration("month");
            setIndex(1);
          }}
          key={1}
        >
          {"一个月"}
        </Tab.Item>
        <Tab.Item
          onPressOut={() => {
            setDuration("year");
            setIndex(2);
          }}
          key={2}
        >
          {"一年"}
        </Tab.Item>
      </Tab>
      <WebView
        originWhitelist={["*"]}
        geolocationEnabled={true}
        javaScriptEnabled={true}
        cacheEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `${root_path}statistic?duration=${duration}` }}
      ></WebView>
    </View>
  );
}

export default DataPage;
