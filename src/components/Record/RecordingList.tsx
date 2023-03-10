import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WeatherRecorder from './WeatherRecorder';
import {Placegetter} from './Place';
import {recordStyleSheet} from "./RecordStyleSheet";
import Icon from "react-native-vector-icons/FontAwesome5";
import {recordContent} from "./recordContent";
import {recordTags} from "./recordTag";
export const recordingList: React.FC = () => {
    const handleWeatherRecorded = (weather: string) => {
        console.log(weather);
    };

    return (
        <View style={recordStyleSheet.container}>
            <View style={recordStyleSheet.iconContainer}>
                <Icon name="map-marked-alt" size={20} color="#333" />
            </View>
            <View style={recordStyleSheet.textContainer}>
                <Text style={recordStyleSheet.text}></Text>
            </View>

            <Placegetter></Placegetter>
            <WeatherRecorder onWeatherRecorded={handleWeatherRecorded} />
        </View>
    );
};



export default recordingList;
