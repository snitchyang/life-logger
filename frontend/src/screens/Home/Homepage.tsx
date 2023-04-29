import React, { ScrollView, TextInput, View } from "react-native";

import { useState } from "react";
import { diaries } from "../../data/data";
import { Ionicons } from "@expo/vector-icons";
import { diaryStyleSheet } from "../../components/Diary/CardView/DiaryStyleSheet";
import { DiaryCard } from "../../components/Diary/CardView/DiaryCard";
import { type IDiary } from "../../interface";

export const HomePage = (): JSX.Element => {
  const [filterData, setFilterData] = useState(diaries);
  const [allData] = useState<IDiary[]>(diaries);
  const [searchText, setSearchText] = useState("");

  function ContentFilter({ item, text }): boolean {
    const title = item.title;
    const content = item.content;
    return title.indexOf(text) > -1 || content.indexOf(text) > -1;
  }

  function TagFilter({ item, t }): boolean {
    // item is an ITag object
    const tags = item.tag;
    for (const tag of tags) {
      if (tag.content.indexOf(t) > -1) return true;
    }
    return false;
  }

  function FilterFun(text): void {
    if (text !== undefined) {
      text = text.toLowerCase();
      const textGroup = text.trim().split(/\s+/);
      const filter: IDiary[] = [];
      let newData: IDiary[] = [];
      for (const text of textGroup) {
        // filter of data, #xxx means it's a tag
        console.log(text);
        if (text.at(0) === "#") {
          console.log("tag");
          const t = text.substring(1);
          newData = allData.filter((item) => TagFilter({ item, t }));
        } else {
          newData = allData.filter((item) => ContentFilter({ item, text }));
        }
        if (newData.length !== 0) {
          newData.forEach((value) => {
            if (!filter.includes(value)) filter.push(value);
          });
        }
      }
      console.log(filter.length);
      setFilterData(filter);
      setSearchText(text);
    } else {
      setFilterData(allData);
      setSearchText(text);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, maxHeight: 30, flexDirection: "row" }}>
        <Ionicons
          name="search-outline"
          size={20}
          style={{ marginLeft: 10, marginTop: 6 }}
        ></Ionicons>
        <View style={{ flex: 1, maxHeight: 30 }}>
          <TextInput
            id="searchInput"
            style={{ paddingLeft: 18 }}
            autoCorrect={false}
            onChangeText={(text) => {
              FilterFun(text);
            }}
            placeholder="type here..."
            value={searchText}
          />
        </View>
      </View>
      <View style={{ flex: 10, minHeight: 200 }}>
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {filterData.map((item, index) => (
              <View
                style={diaryStyleSheet.wrapper}
                onTouchEnd={() => {
                  // navigation.navigate("Detail", { diary: item });
                }}
                key={index}
              >
                <DiaryCard diary={item} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
