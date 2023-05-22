import {
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ToDoListCard from "../../components/Plan/ToDoListCard";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Divider, FAB } from "@rneui/themed";
import { COLOR } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AddPlan, GetPlans } from "../../service/PlanService";
import { IPlan } from "../../interface";

// import Modal from "react-native-modal";

function PlanPage() {
  const { t } = useTranslation();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isDateShown, setIsDateShown] = useState(false);
  const [eventList, setEventList] = useState<IPlan[]>([]);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [finishedPlan, setFinishedPlan] = useState<IPlan[]>([]);
  const [unfinishedPlan, setUnFinishedPlan] = useState<IPlan[]>([]);
  const refreshData = async () => {
    return await GetPlans().then((res) => {
      let finished = [];
      let unfinished = [];
      res.forEach((value) =>
        value.finished ? finished.push(value) : unfinished.push(value)
      );
      setFinishedPlan(finished);
      setUnFinishedPlan(unfinished);
    });
  };

  //fetch IPlan[] from backend
  useEffect(() => {
    refreshData();
  }, []);

  // const eventList = [
  //     {date: "Mar 3", eventName: ["ICS homework", "Jogging"]},
  //     {date: "Mar 5", eventName: ["ADS homework", "PRP"]},
  //     {date: "Mar 7", eventName: ["ADS homework", "PRP"]},
  //     {date: "Mar 9", eventName: ["ADS homework", "PRP"]}
  // ]
  const addEvent = () => {
    setIsAddingEvent(true);
  };
  const dateChange = (event, selectedDate) => {
    setIsDateShown(false);

    if (event.type !== "set") {
      return;
    }

    const currentDate = selectedDate || newEventDate;

    setNewEventDate(currentDate);
    setIsDateShown(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={unfinishedPlan}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshData()}
          />
        }
        renderItem={({ item }) => (
          <ToDoListCard
            plan={item}
            setRefresh={setRefreshing}
            refreshData={refreshData}
          />
          // <View>
          //   <View style={styles.dateContainer}>
          //     <Text style={styles.dateText}>{item.date}</Text>
          //   </View>
          //   <FlatList
          //     data={item.eventName}
          //     renderItem={({ item }) => <ToDoListCard eventName={item} />}
          //   />
          // </View>
        )}
      />
      <Divider />
      <FlatList
        style={{ flex: 1 }}
        data={finishedPlan}
        renderItem={({ item }) => (
          <ToDoListCard
            plan={item}
            setRefresh={setRefreshing}
            refreshData={refreshData}
          />
          // <View>
          //   <View style={styles.dateContainer}>
          //     <Text style={styles.dateText}>{item.date}</Text>
          //   </View>
          //   <FlatList
          //     data={item.eventName}
          //     renderItem={({ item }) => <ToDoListCard eventName={item} />}
          //   />
          // </View>
        )}
      />
      <FAB style={styles.addButton} color={COLOR.primary} onPress={addEvent}>
        <AntDesign name="plus" size={24} color={COLOR.white} />
      </FAB>
      <Modal
        visible={isAddingEvent}
        // onBackButtonPress={() => setIsAddingEvent(false)}
      >
        <View style={styles.containerStyle}>
          <TextInput
            style={styles.textInput}
            placeholder={t("Add an event")}
            onChangeText={(text) => setNewEventName(text)}
          />
          <Button style={{ margin: "5%" }} onPress={() => setIsDateShown(true)}>
            {t("Select a date")}
          </Button>
          {isDateShown && (
            <DateTimePicker value={new Date()} onChange={dateChange} />
          )}
          <Button
            style={{ margin: "5%" }}
            onPress={async () => {
              setIsAddingEvent(false);
              //add the event to the backend
              await AddPlan({ content: newEventName, due: newEventDate });
            }}
          >
            <Text>{t("Add")}</Text>
          </Button>
          <Button onPress={() => setIsAddingEvent(false)}>
            <Text>{"back"}</Text>
          </Button>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    justifyContent: "center",
    height: 50,
    marginLeft: "5%",
  },
  dateText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  addButton: {
    left: 125,
    top: -40,
    height: 1,
    backgroundColor: COLOR.white,
  },
  containerStyle: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  textInput: {
    height: 50,
    margin: "5%",
    width: "90%",
    backgroundColor: COLOR.white,
    borderRadius: 10,
    padding: 15,
  },
});

export default PlanPage;
