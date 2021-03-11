import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { StackActions } from '@react-navigation/native';

const WelcomePage = ({ navigation }: { navigation: any }) => {
    const checkAuth = async () => {
        let token = await AsyncStorage.getItem("LoginToken");
        try {
            await axios({
                method: "GET",
                url: "http://192.168.56.1:3000/api/auth",
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            navigation.dispatch(
                StackActions.replace('HomePage', {
                })
            );
        } catch (err) {
            console.log(err.message);
            Alert.alert(err.message);
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome!</Text>
                <View style={styles.button}>
                    <Button title={"Sign Up"} onPress={() => { navigation.navigate('RegisterPage') }}></Button>
                </View>
                <View style={styles.button}>
                    <Button title={"Sign In"} onPress={() => { navigation.navigate('LoginPage') }}></Button>
                </View>
            </View>
        </>
    )
}

export default WelcomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        marginBottom: 10
    },
    button: {
        marginBottom: 10
    }
});
