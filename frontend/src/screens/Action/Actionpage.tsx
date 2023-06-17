import { Pressable, StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AddDiaryModal } from "../../components/Diary/addModal/AddDiaryModal";

function ActionPage() {
  const [date, setDate] = useState(dayjs(0).hour(0));
  const [number, setNumber] = useState(0);
  const [stop, setStop] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<dayjs.Dayjs>(dayjs());
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [visible, setVisible] = useState<boolean>(false);
  // let timer = setInterval(async () => {
  //   setDate(dayjs(dayjs().diff(startTime)));
  // }, 1000);
  // useEffect(() => {
  //   clearInterval(timer);
  //   return () => clearInterval(timer);
  // }, []);
  useEffect(() => {
    (async () => {
      let t = await AsyncStorage.getItem("begin_time");
      console.log(t);
      if (t) {
        setStartTime(dayjs(t));
        setStop(false);
        setTimer(
          setInterval(() => {
            setDate(dayjs(dayjs().diff(dayjs(t))).hour(0));
          }, 1000)
        );
      }
    })();
  }, []);
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.time}>{date.format("HH:mm:ss")}</Text>
      </View>
      <AddDiaryModal
        visible={visible}
        setVisible={setVisible}
        start_time={startTime}
      />

      <View style={styles.footer}>
        {/* flashlight icon */}
        <Pressable
          onPress={async () => {
            if (stop) {
              // 开始计时器
              const t = dayjs();
              AsyncStorage.setItem("begin_time", t.toString());
              setStartTime(t);
              setTimer(
                setInterval(() => {
                  setDate(dayjs(dayjs().diff(t)).hour(0));
                }, 1000)
              );
            } else {
              // 停止计时器
              const cur_time = dayjs();
              const st_time = await AsyncStorage.getItem("begin_time");
              AsyncStorage.removeItem("begin_time");
              setStartTime(dayjs());
              clearInterval(timer);
              setDate(dayjs(0).hour(0));
              setVisible(true);
            }
            setStop(!stop);
          }}
        >
          {!stop ? (
            <FontAwesome5 name="stop" size={50} color="black" />
          ) : (
            <AntDesign name="caretright" size={50} color="black" />
          )}
        </Pressable>
        {/* camera icon */}
      </View>
    </View>
  );
}

export default ActionPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    height: 250,
  },
  date: {
    color: "#8a8a8a",
    fontSize: 20,
    fontWeight: "500",
  },
  time: {
    fontSize: 75,
    fontWeight: "bold",
    color: "#000000",
    marginTop: "30%",
  },
  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "10%",
    paddingVertical: 10,
    paddingHorizontal: 30,
    // height: 75,
    alignItems: "center",
    alignContent: "center",
  },
  icon: {
    backgroundColor: "#00000050",
    // width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderRadius: 50,
  },
});
