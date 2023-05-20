import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export const LocationPicker = () => {
  const [text, setText] = useState("waiting...");

  async function position() {
    // const re = await Location.requestForegroundPermissionsAsync();
    // if (re.granted !== true) {
    //   console.log("not granted!");
    // }
    // const { status } = await Location.requestBackgroundPermissionsAsync();
    // if (status !== "granted") {
    //   return;
    // }
    // console.log(location);
    // await Location.getCurrentPositionAsync({
    //   accuracy: Location.Accuracy.Low,
    //   timeInterval: 10000,
    // })
    //   .then(() => console.log(location))
    //   .catch((err) => console.error(err));
  }

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {/*<Text style={styles.paragraph}>{text}</Text>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
