import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ITag } from "../../../interface";
import { DiaryTags } from "./DiaryTags";

interface IDiaryHeader {
  tags: ITag[];
  date: Date;
}

export const DiaryHeader = ({ tags, date }: IDiaryHeader) => {
  return (
    <View style={diaryStyleSheet.headerWrapper}>
      <View style={diaryStyleSheet.tagsWrapper}>
        {tags.map((element, index) => (
          <DiaryTags id={index} tag_name={element.content} />
        ))}
      </View>
      <View style={diaryStyleSheet.dateWrapper}>
        <Text style={diaryStyleSheet.dateText}>
          {new Date().getTime() - new Date(date).getTime()}
        </Text>
      </View>
    </View>
  );
};
const diaryStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
    maxHeight: 200,
    minWidth: 400,
    overflow: "hidden",
  },
  headerText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    overflow: "hidden",
  },
  headerWrapper: {
    flex: 1,
    flexDirection: "row",
    minHeight: 18,
    // borderWidth: 2,
    // borderColor: "black",
  },
  tagsWrapper: {
    flex: 7,
    justifyContent: "flex-start",
    flexDirection: "row",
    minHeight: 18,
  },
  tagsContainer: {
    borderWidth: 1,
    borderColor: "#90a0c2",
    borderBottomWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 5,
    backgroundColor: "#FFF",
  },
  tagsText: {
    justifyContent: "flex-start",
    fontStyle: "italic",
    fontSize: 7,
  },
  dateWrapper: {
    flex: 1,
    // justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 4,
    minHeight: 18,
    textAlign: "right",
  },
  dateText: {
    fontSize: 7,
    color: "grey",
  },
  contentWrapper: {
    flex: 6,
    flexDirection: "row",
    minHeight: 100,
  },
  contentTextWrapper: {
    flex: 4,
    textAlign: "left",
    overflow: "hidden",
    marginRight: 10,
  },
  contentText: {
    marginRight: 20,
    fontSize: 12,
    color: "#000",
  },
  contentImg: {
    flex: 1,
    paddingLeft: 10,
    marginRight: 20,
    width: "100%",
    height: "100%",
    // width: 100,
    // height: 100,
  },
  detailHeaderWrapper: {},
  detailInfoWrapper: {
    flex: 1,
    maxHeight: 25,
    marginHorizontal: 30,
    marginTop: 20,
  },
  detailContentWrapper: {
    flex: 1,
    marginHorizontal: 30,
  },
  detailContentContainer: {
    maxHeight: 300,
    marginBottom: 30,
    overflow: "hidden",
  },
  detailImgContainer: {
    flex: 4,
    // borderWidth: 2,
    // borderColor: "black",
  },
  detailImg: {
    flex: 1,
    width: 100,
    height: 130,
    // marginHorizontal: 10,
  },
});
