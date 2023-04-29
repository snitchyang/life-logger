import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { FAB } from "@rneui/base";
import { COLOR } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { ToDoListCard } from "../../components/Plan/ToDoListCard";

export const PlanPage = () => {
  const { t } = useTranslation();
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const eventList = [
    { date: "Mar 3", eventName: ["ICS homework", "Jogging"] },
    { date: "Mar 5", eventName: ["ADS homework", "PRP"] },
    { date: "Mar 7", eventName: ["ADS homework", "PRP"] },
    { date: "Mar 9", eventName: ["ADS homework", "PRP"] },
  ];
  const addEvent = () => {
    setIsAddingEvent(true);
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
              renderItem={({ item }) => (
                <ToDoListCard eventName={item} isDone={true} />
              )}
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
          <TextInput style={styles.textInput} placeholder={t("Add an event")} />
        </View>
      </Modal>
    </View>
  );
};

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
