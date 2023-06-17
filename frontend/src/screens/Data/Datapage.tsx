import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import WebView from "react-native-webview";
import { root_path } from "../../service/global";
import { FAB, Tab } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Loading } from "../../components/Loading/Loading";
import { MaterialIcons } from "@expo/vector-icons";

function DataPage() {
  const [duration, setDuration] = useState("week");
  const [index, setIndex] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const webViewRef = useRef<WebView>();
  const [isMap, setIsMap] = useState(false);
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
        domStorageEnabled={true}
        style={{ marginHorizontal: 20, marginVertical: 10 }}
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
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 10,
          top: 80,
        }}
      >
        <FAB
          style={{
            height: 1,
            backgroundColor: "white",
          }}
          color={"black"}
          onPress={() => {
            setIsMap(!isMap);
            webViewRef.current.reload();
          }}
        >
          <MaterialIcons
            name={isMap ? "switch-left" : "switch-right"}
            size={24}
            color="white"
          />
        </FAB>
      </TouchableOpacity>
    </View>
  );
}

export default DataPage;
