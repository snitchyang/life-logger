import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

interface RegisterFormProps {
    onSubmit: (username: string, password: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        onSubmit(username, password);
    };

    return (
        <View>
            <Text>账号:</Text>
            <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={{ borderWidth: 1, padding: 10 }}
            />
            <Text>密码:</Text>
            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{ borderWidth: 1, padding: 10 }}
            />
            <Button title="注册" onPress={handleSubmit} />
            <Button title="忘记密码" onPress={() => {}} />
        </View>
    );
};

export default RegisterForm;
