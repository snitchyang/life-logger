import { useTranslation } from "react-i18next";
import { ScrollView, TextInput, View } from "react-native";
import * as React from "react";
import { useState } from "react";
import { diaries } from "../../data/data";
import { Ionicons } from "@expo/vector-icons";
import { diaryStyleSheet } from "../../components/Diary/CardView/DiaryStyleSheet";
import { DiaryCard } from "../../components/Diary/CardView/DiaryCard";
import { useNavigation } from "@react-navigation/native";

export const HomePage = () => {
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const [filterData, setFilterData] = useState(diaries);
  const [allData, setAllData] = useState(diaries);
  const [searchText, setSearchText] = useState("");

  function ContentFilter({ item, text }) {
    let title = item.title;
    let content = item.content;
    return title.indexOf(text) > -1 || content.indexOf(text) > -1;
  }

  function TagFilter({ item, t }) {
    // item is an ITag object
    let tags = item.tag;
    for (const tag of tags) {
      if (tag.content.indexOf(t) > -1) return true;
    }
    return false;
  }

  function FilterFun(text) {
    if (text) {
      text = text.toLowerCase();
      let textGroup = text.trim().split(/\s+/);
      let filter = [];
      let newData = undefined;
      for (const text of textGroup) {
        // filter of data, #xxx means it's a tag
        console.log(text);
        newData = undefined;
        if (text.at(0) === "#") {
          console.log("tag");
          let t = text.substring(1);
          newData = allData.filter((item) => TagFilter({ item, t }));
        } else {
          newData = allData.filter((item) => ContentFilter({ item, text }));
        }
        if (newData) {
          for (const data of newData) {
            if (!filter.includes(data)) filter.push(data);
          }
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
            onChangeText={(text) => FilterFun(text)}
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
            {filterData.map((item) => (
              <View
                style={diaryStyleSheet.wrapper}
                onTouchEnd={() => {
                  // navigation.navigate("Detail", { diary: item });
                }}
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
