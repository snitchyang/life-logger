import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";
import { root_path } from "../../service/global";

function DataPage() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        geolocationEnabled={true}
        javaScriptEnabled={true}
        cacheEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `${root_path}map` }}
      ></WebView>
    </View>
  );
}

export default DataPage;
