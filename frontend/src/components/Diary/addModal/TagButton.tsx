import { ITag } from "../../../interface";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonStyle } from "../../../css/GlobalStyleSheet";

interface Props {
  tag: ITag;
  tagSet: Set<ITag>;
  setTagSet: React.Dispatch<React.SetStateAction<Set<ITag>>>;
}

export const TagButton = ({ tag, tagSet, setTagSet }: Props) => {
  const [chosen, setChose] = useState(false);
  useEffect(() => {
    if (tagSet.has(tag)) {
      setChose(true);
    }
  }, [tag]);

  return (
    <TouchableOpacity
      onPress={() => {
        setChose(!chosen);
        let newSet = tagSet;
        if (newSet.has(tag)) newSet.delete(tag);
        else newSet.add(tag);
        setTagSet(newSet);
      }}
      style={{
        marginTop: 10,
        marginHorizontal: 9,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: chosen ? "#000000" : "#d8d8d8",
      }}
    >
      <Text style={ButtonStyle.text}>{tag.content}</Text>
    </TouchableOpacity>
  );
};
