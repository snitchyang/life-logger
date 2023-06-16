import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { root_path } from "../../service/global";
import { Tab } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../../components/Loading/Loading";

function DataPage() {
  const [duration, setDuration] = useState("week");
  const [index, setIndex] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const webViewRef = useRef<WebView>();
  const [isMap, setIsMap] = useState(true);
  const [token, setToken] = useState("");
  const getToken = async () => {
    return await AsyncStorage.getItem("token");
  };
  useEffect(() => {
    getToken().then((res) => setToken(res));
  });
  if (token.length === 0) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1 }}>
      {/*<TouchableOpacity style={{ position: "absolute", top: 20, left: 20 }}>*/}
      {/*  <Button onPress={() => setIsMap(!isMap)}>*/}
      {/*<Text>{"map"}</Text>*/}
      {/*  </Button>*/}
      {/*</TouchableOpacity>*/}

      <Tab value={index}>
        <Tab.Item
          onPressOut={() => {
            if (index === 0) {
              webViewRef.current.reload();
              return;
            }
            setDuration("week");
            setIndex(0);
          }}
          key={0}
        >
          {"一周"}
        </Tab.Item>
        <Tab.Item
          onPressOut={() => {
            if (index === 1) {
              webViewRef.current.reload();
              return;
            }
            setDuration("month");
            setIndex(1);
          }}
          key={1}
        >
          {"一个月"}
        </Tab.Item>
        <Tab.Item
          onPressOut={() => {
            if (index === 2) {
              webViewRef.current.reload();
              return;
            }
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
        source={{
          uri: isMap
            ? `${root_path}map`
            : `${root_path}statistic?duration=${duration}`,
          headers: {
            Authorization: "Bearer" + " " + `${token}`,
          },
        }}
        ref={webViewRef}
      ></WebView>
    </View>
  );
}

export default DataPage;
