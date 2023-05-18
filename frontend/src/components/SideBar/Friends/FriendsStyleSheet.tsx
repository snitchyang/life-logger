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
  nameContainerFollowMe: {
    flex: 4,
    alignItems: "center",
    marginRight: 30,
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
    // backgroundColor: "#adadad",
  },
  titleContainer: {
    marginTop: 25,
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabContainer: {
    marginBottom: 20,
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
    justifyContent: "center",
  },
  titleText: {
    flex: 8,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 40,
  },
  cancelContainer: {
    justifyContent: "center",
  },
  cancelText: {
    fontSize: 10,
    textAlign: "center",
    color: "#3f90a8",
    marginRight: 20,
    paddingTop: 10,
  },
  inputItem: {
    marginHorizontal: 10,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: "#dedede",
  },
  listItem: {
    width: "90%",
    marginVertical: 10,
  },
});

export const searchListStyleSheet = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginVertical: 5,
  },
  avatarContainer: {
    flex: 1,
    marginLeft: 10,
  },
  nameContainer: {
    flex: 12,
    textAlign: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "black",
  },
  nameText: {
    textAlign: "center",
    fontSize: 12,
  },
  friendsText: {
    fontSize: 10,
    color: "grey",
  },
  iconItem: {
    flex: 1,
  },
});

export const FriendsModalStyleSheet = StyleSheet.create({
  wrapper: { flexDirection: "row" },
  titleContainer: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  cancelContainer: {
    fontSize: 10,
    alignItems: "flex-end",
    alignContent: "flex-end",
    // borderWidth: 3,
    marginRight: 30,
  },
  cancelText: {
    fontSize: 15,
    color: "#3f90a8",
  },
  inputFormContainer: {
    minHeight: 30,
    borderWidth: 0.5,
    borderColor: "#cbcbcb",
    borderRadius: 5,
    margin: 15,
    paddingLeft: 10,
    alignItems: "flex-start",
    alignContent: "flex-start",
    flexDirection: "row",
  },
  inputForm: {
    // borderWidth: 3,
    flex: 9,
    minHeight: 30,
  },
  clearInputContainer: {
    flex: 1,
    minHeight: 30,
    alignContent: "center",
    alignItems: "center",
    paddingVertical: 2,
    // borderWidth: 3,
  },
  clearInputIcon: {
    marginTop: 4,
    // borderWidth: 3,
    // borderColor: "red",
  },
});
