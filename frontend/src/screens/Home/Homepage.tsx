import { useTranslation } from "react-i18next";
import { FlatList, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { IDiary, ITag } from "../../interface";
import { DiaryCard } from "../../components/Diary/CardView/DiaryCard";
import { get_diary, get_tags } from "../../service/DiaryService";

function HomePage({ navigation }) {
  const { t, i18n } = useTranslation();
  const [filterData, setFilterData] = useState<IDiary[]>([]);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [allData, setAllData] = useState<IDiary[]>([]);

  useEffect(() => {
    get_diary().then((res) => {
      setAllData(res);
      setFilterData(res);
    });
  }, []);
  useEffect(() => {
    get_tags().then((res) => {
      setAllTags(res);
    });
  }, []);

  const [searchText, setSearchText] = useState("");

  function ContentFilter({ item, text }) {
    let title = item.title;
    let content = item.content;
    return title.indexOf(text) > -1 || content.indexOf(text) > -1;
  }

  function TagFilter({ item, t }) {
    // item is an ITag object
    let tags = allTags;
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
        newData = undefined;
        if (text.at(0) === "#") {
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
      setFilterData(filter);
      setSearchText(text);
    } else {
      setFilterData(allData);
      setSearchText(text);
    }
  }

  if (!allTags || !allData) return <></>;
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
            placeholder="点击搜索"
            value={searchText}
          />
        </View>
      </View>

      <View style={{ flex: 10, minHeight: 200 }}>
        {/*<ScrollView style={{ flex: 1 }}>*/}
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FlatList
            data={filterData}
            renderItem={({ item, index }) => (
              <View
                style={{
                  // flex: 1,
                  maxHeight: 200,
                  minWidth: 400,
                  overflow: "hidden",
                }}
                onTouchEnd={() => {
                  navigation.navigate("Detail", { diary: item });
                }}
              >
                <DiaryCard diary={item} key={index} />
              </View>
            )}
          />
        </View>
        {/*</ScrollView>*/}
      </View>
    </View>
  );
}

export default HomePage;
