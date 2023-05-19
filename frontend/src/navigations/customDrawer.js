import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
//import {Image} from "@rneui/themed";
import { COLOR } from "../constants";

const customDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{ height: 250, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={require("../assets/diaryImage/testPic.jpg")}
          style={{
            width: 130,
            height: 130,
            borderRadius: 130 / 2,
            borderColor: COLOR.black,
            borderWidth: 3,
            top: -30,
          }}
        />
        <Text style={styles.username}>USERNAME</Text>
      </View>
      <View>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  username: {
    fontSize: 25,
    fontWeight: "bold",
    top: -10,
  },
});

export default customDrawer;
