import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TimeRangePickerProps {
    onChange: (startDate: Date, endDate: Date) => void;
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ onChange }) => {
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);
        onChange(currentDate, endDate);
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
        onChange(startDate, currentDate);
    };

    return (
        <View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>开始时间: {startDate.toISOString()}</Text>
                <Button
                    title="选择开始时间"
                    onPress={() => setShowStartDatePicker(true)}
                />
            </View>
            {showStartDatePicker && (
                <DateTimePicker
                    testID="startDateTimePicker"
                    value={startDate}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleStartDateChange}
                />
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text>结束时间: {endDate.toISOString()}</Text>
                <Button
                    title="选择结束时间"
                    onPress={() => setShowEndDatePicker(true)}
                />
            </View>
            {showEndDatePicker && (
                <DateTimePicker
                    testID="endDateTimePicker"
                    value={endDate}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={handleEndDateChange}
                />
            )}
        </View>
    );
};

export default TimeRangePicker;
