import React, { useState } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const register = async () => {
        try {
            if (password !== confirmPassword) {
                Alert.alert("password and confirm Password is not the same!");
                return;
            }
            
            if(password === "" || confirmPassword === ""|| email === ""|| name===""|| address ===""||phone ===""){
                Alert.alert("Please Enter All Field");
                return;
            }

            axios({
                method: "POST",
                url: "http://192.168.56.1:3000/api/auth/register",
                data: {
                    email: email,
                    password: password,
                    name: name,
                    address: address,
                    phone: phone
                }
            });
        } catch (err) {
            console.log(err.message);
            Alert.alert(err.message);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Registration</Text>
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
                <TextInput
                    value={confirmPassword}
                    onChangeText={(password) => { setConfirmPassword(password) }}
                    placeholder={'Confirm Password'}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <TextInput
                    value={name}
                    onChangeText={(name) => { setName(name) }}
                    placeholder={'Name'}
                    style={styles.input}
                />
                <TextInput
                    value={address}
                    onChangeText={(address) => { setAddress(address) }}
                    placeholder={'Address'}
                    style={styles.input}
                />
                <TextInput
                    value={phone}
                    onChangeText={(phone) => { setPhone(phone) }}
                    placeholder={'Phone'}
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Register" onPress={() => { register() }}></Button>
                </View>
            </View>
        </>
    )
}

export default RegisterPage;

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
