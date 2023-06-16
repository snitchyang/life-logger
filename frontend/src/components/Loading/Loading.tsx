import { ActivityIndicator, View } from "react-native";
import React from "react";

export const Loading = () => {
  return (
    <View
      style={{
        alignItems: "center",
        alignContent: "center",
        top: "50%",
      }}
    >
      <ActivityIndicator size={"large"} color={"black"} />
    </View>
  );
};
