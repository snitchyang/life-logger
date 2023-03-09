import {Text, View} from "react-native";
import ToDoListCard from "../components/ToDoListCard";
import {FlatList} from "react-native";
import * as React from "react";
import {StyleSheet} from "react-native";
import {Button, FAB} from "@rneui/base";
import {COLOR} from "../constants";
import {AntDesign} from "@expo/vector-icons";

function PlanPage() {
    const eventList = [
        {date: "Mar 3", eventName: ["ICS homework", "Jogging"]},
        {date: "Mar 5", eventName: ["ADS homework", "PRP"]},
        {date: "Mar 7", eventName: ["ADS homework", "PRP"]},
        {date: "Mar 9", eventName: ["ADS homework", "PRP"]}
    ]
    return(
        <View style={{ flex:1}}>
            <FlatList style={{flex:1}}
                data={eventList}
                renderItem={({item}) => (
                    <View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </View>
                        <FlatList data={item.eventName} renderItem={
                            ({item}) => (
                                <ToDoListCard eventName={item} />
                            )
                        }/>
                    </View>
                )
            }
            />
            <FAB style={styles.addButton} color={COLOR.primary}>
                <AntDesign name="plus" size={24} color={COLOR.white}/>
            </FAB>
        </View>
    )
}

const styles = StyleSheet.create({
    dateContainer:{
        justifyContent:'center',
        height: 50,
        marginLeft:"5%",
    },
    dateText:{
        fontWeight:'bold',
        fontSize: 20
    },
    addButton:{
        left:125,
        top:-40,
        height:1
    }
})

export default PlanPage
