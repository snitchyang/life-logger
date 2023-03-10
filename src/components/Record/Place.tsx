import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import React, {useState} from "react";
import {Text, View} from "react-native";
import {recordStyleSheet} from "./RecordStyleSheet";
export const Placegetter:React.FC = ()=>{
    const [location, setLocation] = useState('Choose your place');
    return(
    <view>
        <View style={recordStyleSheet.iconContainer}>
            <Icon name="map-marked-alt" size={20} color="#333" />
        </View>
        <View style={recordStyleSheet.textContainer}>
            <Text style={recordStyleSheet.text}>{location}</Text>
        </View>
    </view>
    )
}
