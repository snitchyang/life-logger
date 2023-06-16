import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CheckBox, Text } from "@rneui/themed";
import { COLOR } from "../../constants";
import { IPlan } from "../../interface";
import { PutPlan } from "../../service/PlanService";
import dayjs from "dayjs";

interface Props {
  plan: IPlan;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refreshData: () => Promise<void>;
}

const ToDoListCard = ({ plan, setRefresh, refreshData }: Props) => {
  const [finished, setFinished] = useState(plan.finished);
  return (
    <View style={styles.cardContainer}>
      <CheckBox
        checked={finished}
        title={
          <View style={{ marginLeft: 8 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: finished ? "normal" : "bold",
                textDecorationLine: finished ? "line-through" : "none",
                textDecorationStyle: "solid",
              }}
            >
              {plan.content}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: "normal" }}>
              {dayjs(plan.due).format("MM-DD ddd")}
            </Text>
          </View>
        }
        containerStyle={{ width: "90%" }}
        textStyle={{
          fontSize: 18,
          top: -2,
          textDecorationLine: finished ? "line-through" : "none",
          color: finished ? COLOR.gray : COLOR.black,
        }}
        size={25}
        checkedColor={COLOR.gray}
        onPress={async () => {
          setFinished(!finished);
          await PutPlan({ id: plan.id, finished: !plan.finished });
          await refreshData();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 70,
    width: "90%",
    marginLeft: "5%",
    marginTop: 7,
    borderRadius: 10,
    backgroundColor: COLOR.card,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ToDoListCard;
