import {Text, View} from "react-native";
import * as React from "react";
import {recordContent} from "../../components/Record/recordContent";
import {recordingList} from "../../components/Record/RecordingList";

function ActionPage() {

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <recordContent></recordContent>
            <recordingList></recordingList>
        </View>
    )
}

export default ActionPage
