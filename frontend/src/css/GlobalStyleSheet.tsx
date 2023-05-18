import { StyleSheet } from "react-native";

// button applies to a <Pressable/>
export const ButtonStyle = StyleSheet.create({
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

export const InputFormStyle = StyleSheet.create({
  inputFormContainer: {
    minWidth: "90%",
    borderWidth: 0.5,
    borderColor: "#cbcbcb",
    borderRadius: 5,
    paddingLeft: 10,
    flexDirection: "row",
  },
  inputForm: {
    textAlign: "auto",
    minWidth: "85%",
    overflow: "hidden",
    paddingLeft: 5,
    fontSize: 16,
  },
});

export const RowCenterStyle = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
});
