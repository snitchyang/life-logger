import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native-gesture-handler';
import { recordStyleSheet } from "./RecordStyleSheet";
interface Props {
    onWeatherRecorded: (weather: string) => void;
}

const WeatherRecorder: React.FC<Props> = ({ onWeatherRecorded }) => {
    const [weather, setWeather] = useState('');

    const handlePress = () => {
        onWeatherRecorded(weather);
    };

    return (
        <TouchableOpacity style={recordStyleSheet.container} onPress={handlePress}>
        <View style={recordStyleSheet.textInputContainer}>
            <Icon name="location-arrow" size={20} color="#333" />
    <TextInput
        style={recordStyleSheet.text}
    onChangeText={setWeather}
    value={weather}
    placeholder="Today's weather"
        />
        </View>
        </TouchableOpacity>
);
};



export default WeatherRecorder;
