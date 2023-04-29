import React, {useState} from "react";
import {View, Text} from "react-native";
import {CheckBox} from "@rneui/base";
import {StyleSheet} from "react-native";
import {COLOR} from "../../constants";

const ToDoListCard = ({eventName, isDone}) => {
    const [finished, setFinished] = useState(isDone)
    return(
        <View style={styles.cardContainer}>
            <CheckBox
                checked={finished}
                title={eventName}
                containerStyle={{width: "90%"}}
                textStyle={{
                    fontSize:18,
                    top:-2,
                    textDecorationLine: finished ? "line-through" : "none",
                    color: finished?COLOR.gray:COLOR.black
                }}
                size={25}
                checkedColor={COLOR.gray}
                onPress={()=>setFinished(!finished)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        height:70,
        width:"90%",
        marginLeft:"5%",
        marginTop: 7,
        borderRadius:10,
        backgroundColor:COLOR.card,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default ToDoListCard
