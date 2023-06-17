import { useTranslation } from "react-i18next";
import {
  FlatList,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { IDiary, ITag } from "../../interface";
import { get_diary, get_tags } from "../../service/DiaryService";
import { LayoutStyle } from "../../css/GlobalStyleSheet";
import { Divider, FAB } from "@rneui/themed";
import { AddDiaryModal } from "../../components/Diary/addModal/AddDiaryModal";
import { DiaryHeader } from "../../components/Diary/DiaryHeader";
import { DiaryContent } from "../../components/Diary/DiaryContent";
import { Loading } from "../../components/Loading/Loading";
import { COLOR } from "../../constants";

function Diary({ navigation }) {
  const { t, i18n } = useTranslation();
  const [filterData, setFilterData] = useState<IDiary[]>([]);
  const [allTags, setAllTags] = useState<ITag[]>([]);
  const [allData, setAllData] = useState<IDiary[]>([]);
  const [addDiary, setAddDiary] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get_diary().then((res) => {
      setAllData(res);
      setFilterData(res);
    });
    setRefreshing(false);
    setLoading(false);
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

  if (loading) return <Loading />;

  return (
    <View style={{}}>
      <View
        style={{
          // flex: 1,
          // maxHeight: 30,
          alignItems: "center",
          alignContent: "center",
          // paddingBottom: 5,
        }}
      >
        <View
          style={{
            marginLeft: 5,
            marginTop: 5,
            width: "95%",
            borderWidth: 0.5,
            borderColor: "#cbcbcb",
            borderRadius: 5,
            flexDirection: "row",
          }}
        >
          <Ionicons
            name="search-outline"
            size={20}
            style={{ marginLeft: 10, marginTop: 6 }}
          ></Ionicons>
          <TextInput
            id="searchInput"
            style={{
              textAlign: "auto",
              overflow: "hidden",
              marginLeft: 8,
              fontSize: 16,
            }}
            autoCorrect={false}
            onChangeText={(text) => FilterFun(text)}
            placeholder={"点击搜索"}
            value={searchText}
          />
        </View>
      </View>
      <FlatList
        style={{}}
        data={filterData}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await get_diary().then(async (res) => {
                setAllData(res);
                setFilterData(res);
                setRefreshing(false);
              });
            }}
          />
        }
        renderItem={({ item, index }) => (
          <View>
            <View style={{ height: 10 }}></View>
            <TouchableOpacity
              style={{ backgroundColor: "white" }}
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Detail", { diary: item });
              }}
            >
              <View
                style={{
                  marginHorizontal: "3%",
                  marginVertical: 8,
                }}
              >
                <View style={{ marginVertical: 10, ...LayoutStyle.center }}>
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.title}
                  </Text>
                </View>
                <Divider></Divider>
                <DiaryHeader tags={item.tag} date={item.begin} />
                <DiaryContent content={item.content} images={item.images} />
              </View>
              {/*<DiaryCard diary={item} key={index} />*/}
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{}}>
        <View
          style={{
            alignItems: "center",
            alignContent: "center",
            width: "100%",
            // justifyContent: "center"
          }}
        ></View>
      </View>
      <AddDiaryModal visible={addDiary} setVisible={setAddDiary} />
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 10,
          top: 30,
        }}
      >
        <FAB
          style={{
            height: 1,
            backgroundColor: "white",
          }}
          color={"black"}
          onPress={() => setAddDiary(true)}
        >
          <AntDesign name="plus" size={24} color={COLOR.white} />
        </FAB>
      </TouchableOpacity>
    </View>
  );
}

export default Diary;
