import { useTranslation } from "react-i18next";
import { ScrollView, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { IDiary } from "../../interface";
import { DiaryCard } from "../../components/Diary/CardView/DiaryCard";

function HomePage({ navigation }) {
  const { t, i18n } = useTranslation();
  const [filterData, setFilterData] = useState<IDiary[]>([]);
  const [allData, setAllData] = useState<IDiary[]>([]);
  const getDiary = async (): Promise<IDiary[]> => {
    return await fetch("http://10.0.2.2:8000/api/diaries", {
      headers: {
        Authorization: "Token 3518f3f1a74627cb896612ac4634b82ef6d2848f",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getDiary().then((res) => {
      setAllData(res);
      setFilterData(res);
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
            {filterData.map((item, index) => (
              <View
                style={{
                  flex: 1,
                  maxHeight: 200,
                  minWidth: 400,
                  overflow: "hidden",
                }}
                onTouchEnd={() => {
                  navigation.navigate("Detail", { diary: item });
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
}

export default HomePage;
