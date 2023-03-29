import React from "react";
import {useTranslation} from "react-i18next";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {StyleSheet} from "react-native";
import {COLOR} from "../constants";
import {Divider} from "@rneui/themed"
import {AntDesign} from '@expo/vector-icons';

const SettingsPage = () => {
    const {t} = useTranslation()
    const settingsList = [t('phone number'), t('change password'), t('language'), t('about')]
    return (
        <View style={{flex:1}}>
            <View style={styles.listStyle}>
                <FlatList
                    data={settingsList}
                    renderItem={({item}) => {
                        return (
                            <View>
                                <View style={styles.buttonContainerStyle}>
                                    <TouchableOpacity style={styles.buttonStyle}>
                                        <Text style={styles.TextStyle}>{item}</Text>

                                    </TouchableOpacity>
                                    <AntDesign style={styles.iconStyle} name="right" size={24} color="black"/>
                                </View>
                                <Divider style={styles.dividerStyle}/>
                            </View>
                        )
                    }}
                />
            </View>
            <View style={{height: 300}}>
                <TouchableOpacity style={styles.logOutButtonStyle}>
                    <Text style={styles.logOutTextStyle}>{t("log out")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listStyle: {
        backgroundColor: COLOR.white,
        width: "90%",
        height: "34%",
        left: "5%",
        top: 20,
        borderRadius: 10
    },
    TextStyle: {
        fontSize: 17,
    },
    buttonStyle: {
        height: 60,
        textAlign: 'left',
        paddingLeft: 20,
        justifyContent: 'center',
        marginTop: 1,
        opacity: 1,
    },
    buttonContainerStyle: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    iconStyle: {
        top: 18,
        left: -10,
        color: COLOR.gray
    },
    dividerStyle: {
        left: "2.5%",
        width: "95%"
    },
    logOutButtonStyle: {
        width: "90%",
        left: "5%",
        marginTop:30,
        height: 70,
        borderRadius: 10,
        backgroundColor: COLOR.white,
        color: COLOR.warning,
        alignItems:'center',
        justifyContent:'center'
    },
    logOutTextStyle:{
        color:COLOR.warning,
        fontSize:20,
        fontWeight:"bold"
    }
})

export default SettingsPage