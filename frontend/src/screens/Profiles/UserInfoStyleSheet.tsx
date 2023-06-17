import { StyleSheet } from "react-native";

export const userInfoStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    minHeight: 60,
  },
  boxTitle: {
    flex: 8,
  },
  boxTitleText: {
    paddingLeft: 20,
    fontSize: 15,
  },
  boxInfo: {
    flex: 3,
    // maxWidth: 100,
    height: "100%",
    backgroundColor: "#FFF",
  },
  boxInfoAvatar: {
    marginLeft: 16,
  },
  boxInfoText: {
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 16,
  },
  selectInfoText: {
    fontSize: 13,
  },
  selectedText: {
    color: "#16699d",
  },
  boxIcon: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
});
