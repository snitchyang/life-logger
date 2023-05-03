import React, { useState } from "react";
import { ToastAndroid } from "react-native";
import { View, Text, TextInput, Button,StyleSheet } from "react-native";
import {COLOR} from "../../constants";
import {IUser} from "../../interface";

const RegisterForm: React.FC<IUser> = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin=()=>{
        fetch("http://10.0.2.2:8000/api/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                username: "123456",
                password: "123456",
            }),
        })
            .then(
                (res) => res.json()
            )
            .then((res) => localStorage.setItem("token", res.token));


    }
    const doReg=()=>{

    }
    const findAccount=()=>{

    }
    return (
        <View style={styles.loginPage}>
            <View style={styles.loginSection}>
                <Text style={styles.loginTitle}>Life Logger</Text>
                <TextInput style={styles.loginInput} placeholder='手机号码' keyboardType={'numeric'}
                           defaultValue={username} autoCapitalize={'none'} maxLength={11}
                           onChangeText={(text) => setUsername(text)}/>
                <TextInput style={styles.loginInput} placeholder='password' secureTextEntry={true}
                           defaultValue={password} autoCapitalize={'none'} maxLength={20}
                           onChangeText={(text) => setPassword(text)}/>
                <Button  title={'登录'}
                         onPress={() => handleLogin()}/>
                <View style={styles.subButton}>
                    <Text style={styles.subButtonText} onPress={() =>doReg()}>免费注册</Text>
                    <Text style={styles.subButtonText} onPress={() =>findAccount()}>找回密码</Text>
                </View>
                {/*<Text style={styles.message}>{message}</Text>*/}
                {/*<Text style={{marginTop: 16, fontSize: 12}}>状态: {this.props.status}</Text>*/}
            </View>
        </View>
    );
};

export default RegisterForm;

const styles = StyleSheet.create({
    loginPage: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: COLOR.THEME_BACKGROUND
    },
    loginSection: {
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 20
    },
    loginTitle: {
        fontSize: 28,
        fontWeight: '500',
        color: COLOR.THEME_LABEL,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32
    },
    subButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    subButtonText: {
        color: COLOR.THEME_TEXT,
        fontSize: 14
    },
    loginInput: {
        marginBottom: 8
    },
    message: {
        marginTop: 16,
        color: COLOR.THEME_TEXT,
        fontSize: 14
    }
});


