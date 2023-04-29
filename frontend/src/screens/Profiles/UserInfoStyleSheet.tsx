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
    paddingLeft: 15,
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
    fontSize: 13,
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

export const changeInfoStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    marginTop: 20,
  },
  titleText: {
    textAlign: "center",
    fontSize: 20,
  },
  inputContainer: {
    minWidth: 40,
    width: "100%",
    // marginVertical: 20,
    paddingLeft: 30,
    borderWidth: 0.5,
    borderColor: "#dcdcdc",
  },
  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
    marginTop: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#dedede",
  },
});
