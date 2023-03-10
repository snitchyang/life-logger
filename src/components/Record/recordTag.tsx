import { Text, View } from "react-native";
import { ITag } from "../../interface";
import { recordStyleSheet } from "./RecordStyleSheet";

interface DiaryTags {
    id: number;
    tag_name: string;
}

export const recordTags = ({ id, tag_name }: DiaryTags) => {
    return (
        <View style={recordStyleSheet.tagsSelector}>
            <Text style={recordStyleSheet.tagsText}>{"# " + tag_name}</Text>
        </View>
    );
};