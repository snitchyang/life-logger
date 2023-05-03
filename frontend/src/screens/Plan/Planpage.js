import {Text, TextInput, View} from "react-native";
import ToDoListCard from "../../components/Plan/ToDoListCard";
import {FlatList} from "react-native";
import * as React from "react";
import {StyleSheet} from "react-native";
import {Button, FAB} from "@rneui/base";
import {COLOR} from "../../constants";
import {AntDesign} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import Modal from "react-native-modal";
import {useTranslation} from "react-i18next";
import {IPlan} from "../../interface";

function PlanPage() {
    const {t} = useTranslation();
    const [isAddingEvent, setIsAddingEvent] = useState(false)
    const [eventList, setEventList] = useState([])
    //fetch IPlan[] from backend
    useEffect(() => {fetch('http://10.0.2.2:8000/api/plan/', {
        method: 'GET',
    }).then((res)=>res.json()).then(
        (response) => {
            //convert planList to eventList. eventList is a json data, which is a list of {date: string, eventName: string[]}
            let newList = []
            for (let i = 0; i < response.length; i++) {
                //if the date of the plan is already in the eventList, add the plan to the eventName of the eventList
                if (newList.some((event) => event.date === response[i].date)) {
                    newList.find((event) => event.date === response[i].date).eventName.push(planList[i].name)
                }else{
                    //if the date of the plan is not in the eventList, add a new event to the eventList
                    newList.push({date: response[i].date, eventName: [response[i].name]})
                }
            }
            setEventList(newList)
        }
    )},[])

    // const eventList = [
    //     {date: "Mar 3", eventName: ["ICS homework", "Jogging"]},
    //     {date: "Mar 5", eventName: ["ADS homework", "PRP"]},
    //     {date: "Mar 7", eventName: ["ADS homework", "PRP"]},
    //     {date: "Mar 9", eventName: ["ADS homework", "PRP"]}
    // ]
    const addEvent = () => {
        setIsAddingEvent(true)
    }
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
            <FAB style={styles.addButton} color={COLOR.primary} onPress={addEvent}>
                <AntDesign name="plus" size={24} color={COLOR.white}/>
            </FAB>
            <Modal
                isVisible={isAddingEvent}
                onBackButtonPress={()=>setIsAddingEvent(false)}>
                <View style={styles.containerStyle}>
                    <TextInput style={styles.textInput} placeholder={t('Add an event')}/>
                </View>
            </Modal>
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
        height:1,
        backgroundColor:COLOR.white
    },
    containerStyle:{
      width:"100%",
      position:"absolute",
      bottom:0
    },
    textInput:{
        height:50,
        margin:"5%",
        width:"90%",
        backgroundColor:COLOR.white,
        borderRadius:10,
        padding:15
    }
})

export default PlanPage
