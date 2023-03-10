import React,{useState} from "react";
import {View, TextInput, Button, Alert, Text} from "react-native";
import { recordStyleSheet } from "./RecordStyleSheet";
import {diaries} from "../../data/data"
import Icon from 'react-native-vector-icons/FontAwesome';
export const recordContent:React.FC = ()=>{
    const [EventText,setEventText] = useState<string>('');
    const handleSaveEvent=()=>{
        if(EventText){
//// implement:写入日记
            Alert.alert('保存日记！');
        }
        else{
            Alert.alert('输入为空！');
        }
    }
    return (
      <View style={recordStyleSheet.container}>
          <View style={recordStyleSheet.iconContainer}>
              <Icon name="map-marked-alt" size={20} color="#333" />
          </View>
          <View style={recordStyleSheet.textContainer}>
              <TextInput
                  value={EventText}
                  onChangeText={(text)=>setEventText(text)}
                  placeholder="做了神么捏？"
                  multiline={true}
                  numberOfLines={5}
                  textAlignVertical="top"
                  style={recordStyleSheet.title}
              ></TextInput>
          </View>
          <TextInput
              value={EventText}
              onChangeText={(text)=>setEventText(text)}
              placeholder="开始记录你的生活吧，过得怎么样？"
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
              style={recordStyleSheet.textInput}
              ></TextInput>
          <View style={recordStyleSheet.buttonContainer}>
              <Button title={"保存"} onPress={handleSaveEvent}></Button>
          </View>
      </View>
    );
}
export default recordContent;