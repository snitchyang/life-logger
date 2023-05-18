import { StyleSheet } from "react-native";

export const ChangeInfoStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  titleContainer: {
    marginTop: 60,
    alignItems: "center",
    alignContent: "center",
    marginBottom: -30,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "auto",
    flexDirection: "row",
    minHeight: 80,
  },
  buttonView: {
    flex: 1,
    minWidth: 40,
    // marginHorizontal: 20,
    alignItems: "center",
    alignContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
