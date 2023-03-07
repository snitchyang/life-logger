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
  },
  boxTitle: {
    flex: 8,
    justifyContent: "flex-start",
  },
  boxInfo: {
    flex: 2,
    height: "100%",
    textAlign: "right",
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
  },
  titleContainer: {
    width: "100%",
    marginVertical: 20,
    alignContent: "center",
  },
  titleText: {
    fontSize: 20,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 20,
  },
  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#dedede",
  },
});
