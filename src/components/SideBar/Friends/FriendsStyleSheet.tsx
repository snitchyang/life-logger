import { StyleSheet } from "react-native";

export const friendsStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    height: "100%",
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: "#dedede",
  },
  avatarContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "black",
  },
  nameContainer: {
    flex: 4,
    // borderWidth: 1,
    // borderColor: "black",
  },
  nameText: {
    fontSize: 15,
    textAlign: "center",
    paddingTop: 3,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 8,
  },
});

export const friendsViewStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  addButtonContainer: {
    width: "100%",
    alignContent: "center",
    flexDirection: "row",
  },
  textIconWrapper: {
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 20,
    textAlign: "center",
    paddingLeft: 10,
  },
  friendsListContainer: {
    marginTop: 30,
    width: "100%",
  },
});

export const searchFriendsStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 20,
    flexDirection: "row",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelContainer: {
    justifyContent: "flex-end",
  },
  cancelText: {
    fontSize: 20,
    color: "#3f90a8",
  },
  inputItem: {
    marginHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "#dedede",
  },
  listItem: {
    width: "90%",
  },
});

export const searchListStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  avatarContainer: {
    flex: 2,
    marginLeft: 10,
  },
  nameContainer: {
    flex: 2,
    textAlign: "center",
  },
  nameText: {
    fontSize: 12,
  },
  iconItem: {
    flex: 1,
  },
});
