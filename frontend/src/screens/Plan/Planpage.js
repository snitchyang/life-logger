import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import ToDoListCard from "../../components/Plan/ToDoListCard";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, FAB } from "@rneui/base";
import { COLOR } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import DateTimePicker from "@react-native-community/datetimepicker";
import { root_path } from "../../service/global";

function PlanPage() {
  const { t } = useTranslation();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [isDateShown, setIsDateShown] = useState(false);
  const [eventList, setEventList] = useState([]);
  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState(new Date());
  //fetch IPlan[] from backend
  useEffect(() => {
    fetch(`${root_path}plans`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        //convert planList to eventList. eventList is a json data, which is a list of {date: string, eventName: string[]}
        let newList = [];
        for (let i = 0; i < response.length; i++) {
          //if the date of the plan is already in the eventList, add the plan to the eventName of the eventList
          if (newList.some((event) => event.date === response[i].date)) {
            newList
              .find((event) => event.date === response[i].date)
              .eventName.push(planList[i].name);
          } else {
            //if the date of the plan is not in the eventList, add a new event to the eventList
            newList.push({
              date: response[i].date,
              eventName: [response[i].name],
            });
          }
        }
        setEventList(newList);
      });
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
        data={eventList}
        renderItem={({ item }) => (
          <View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <FlatList
              data={item.eventName}
              renderItem={({ item }) => <ToDoListCard eventName={item} />}
            />
          </View>
        )}
      />
      <FAB style={styles.addButton} color={COLOR.primary} onPress={addEvent}>
        <AntDesign name="plus" size={24} color={COLOR.white} />
      </FAB>
      <Modal
        isVisible={isAddingEvent}
        onBackButtonPress={() => setIsAddingEvent(false)}
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
            <DateTimePicker
              value={new Date()}
              modal={true}
              onChange={dateChange}
            />
          )}
          <Button
            style={{ margin: "5%" }}
            onPress={() => {
              setIsAddingEvent(false);
              //add the event to the eventList
              setEventList([
                ...eventList,
                {
                  date: newEventDate.toDateString(),
                  eventName: [newEventName],
                },
              ]);
              //add the event to the backend
              fetch("http://10.0.2.2:8000/api/plans", {
                method: "POST",
                body: JSON.stringify({
                  name: newEventName,
                  date: newEventDate.toDateString(),
                  finished: false,
                }),
              })
                .then((res) => res.json())
                .then((response) => {
                  console.log(response.data);
                });
            }}
          >
            {t("Add")}
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
