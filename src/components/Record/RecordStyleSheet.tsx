import { StyleSheet } from "react-native";


export const recordStyleSheet= StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'stretch',
        padding:10,
    },
    textInput:{
        flex:1,
        borderColor:"dgreen",
        backgroundColor:"lgreen",
        borderWidth:1,
        borderRadius:5,
        padding:10,
        fontSize:16,
        maxHeight:200,
    },
    buttonContainer:{
        paddingTop:10,
        paddingBottom:10,
        shadowColor:"ddgreen",
        backgroundColor:"skygreen",
    },
    tagsSelector: {
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
    placeContainer:{
        paddingTop:10,
        paddingBottom:10,
    },
    textcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        padding: 10,
    },
    textContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    textInputContainer: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: 150,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
