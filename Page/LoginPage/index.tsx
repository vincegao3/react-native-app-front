import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

const LoginPage = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            let result = await axios({
                method: "POST",
                url: "http://192.168.56.1:3000/api/auth/login",
                data: {
                    email: email,
                    password: password
                }
            });
            await AsyncStorage.setItem('LoginToken', result.data.token);
            navigation.dispatch(StackActions.popToTop());
            navigation.dispatch(
                StackActions.replace('HomePage', {
                })
            );
        } catch (err) {
            Alert.alert(err.message);
        }
    }
    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>User Login</Text>
                </View>
                <TextInput
                    value={email}
                    onChangeText={(email) => { setEmail(email) }}
                    placeholder={'Email'}
                    style={styles.input}
                />
                <TextInput
                    value={password}
                    onChangeText={(password) => { setPassword(password) }}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={() => { login() }}></Button>
                </View>
            </View>
        </>
    )
}

export default LoginPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        marginBottom: 50
    },
    buttonContainer: {
    },
    input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
});
