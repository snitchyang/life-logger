import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { IDiary, ITag } from "../../interface";
import { DiaryCard } from "../../components/Diary/DiaryCard";
import { get_diary, get_tags } from "../../service/DiaryService";
import { InputFormStyle } from "../../css/GlobalStyleSheet";
import { FAB } from "@rneui/themed";
import { AddDiaryModal } from "../../components/Diary/addModal/AddDiaryModal";

function Diary({ navigation }) {
  const { t, i18n } = useTranslation();
  const [filterData, setFilterData] = useState<IDiary[]>([]);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [allData, setAllData] = useState<IDiary[]>([]);
  const [addDiary, setAddDiary] = useState(false);

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

  if (!allTags || !allData)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          maxHeight: 30,
          flexDirection: "row",
          paddingBottom: 5,
        }}
      >
        <Ionicons
          name="search-outline"
          size={20}
          style={{ marginLeft: 10, marginTop: 6 }}
        ></Ionicons>
        <View
          style={{
            marginLeft: 5,
            marginTop: 5,
            ...InputFormStyle.inputFormContainer,
          }}
        >
          <TextInput
            id="searchInput"
            style={InputFormStyle.inputForm}
            autoCorrect={false}
            onChangeText={(text) => FilterFun(text)}
            placeholder={"点击搜索"}
            value={searchText}
          />
        </View>
      </View>
      <View style={{ flex: 10, minHeight: 200 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            alignContent: "center",
            // justifyContent: "center"
          }}
        >
          <FlatList
            style={{ position: "absolute" }}
            data={filterData}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  maxHeight: 200,
                  minWidth: 400,
                  overflow: "hidden",
                }}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("Detail", { diary: item });
                }}
              >
                <DiaryCard diary={item} key={index} />
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            right: 20,
            top: 10,
          }}
        >
          <FAB
            icon={{ name: "add", color: "white" }}
            color={"black"}
            onPress={() => setAddDiary(true)}
            size={"small"}
          />
        </TouchableOpacity>
      </View>
      <AddDiaryModal visible={addDiary} setVisible={setAddDiary} />
    </View>
  );
}

export default Diary;
