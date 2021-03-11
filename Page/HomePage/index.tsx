import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Button, Alert, Modal, Text, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment-timezone';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import icon from '../../assets/person-icon.png';
import { StackActions } from '@react-navigation/native';

const HomePage = ({ navigation }: { navigation: any }) => {
    const [data, setData] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [detail, setDetail] = useState({});

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
        } catch (err) {
            Alert.alert(err.message);
            navigation.dispatch(
                StackActions.replace('HomePage', {
                })
            );
        }
    }

    const fetchData = async () => {
        try {
            let token = await AsyncStorage.getItem("LoginToken");
            let query = new URLSearchParams();
            let today = moment().endOf('day').toISOString();
            let startDay = moment().startOf('day').subtract(parseInt(selectedDay), "days").toISOString();
            query.append('timeFrom', startDay);
            query.append('timeEnd', today);

            let result = await axios({
                method: "GET",
                url: "http://192.168.56.1:3000/api/consult-record?" + query,
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            setData(result.data);
        } catch (err) {
            Alert.alert(err.message);
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        fetchData()
    }, [selectedDay]);

    const Item = ({ patient, diagnosis, item }: { patient: String, diagnosis: String, item: object }) => (
        <TouchableOpacity style={styles.item} onPress={() => { setModalVisible(true); setDetail(item) }}>
            <Image source={icon} style={styles.icon} />
            <Text style={styles.title}>{patient}</Text>
            <Text style={styles.text}>{diagnosis}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }: { item: object }) => (
        <Item patient={item.patient} diagnosis={item.diagnosis} item={item} />
    );
    return (
        <>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.title}>Detail</Text>
                            <Text style={styles.modalText}>Doctor: {detail.doctor}</Text>
                            <Text style={styles.modalText}>Patient: {detail.patient}</Text>
                            <Text style={styles.modalText}>Diagnosis: {detail.diagnosis}</Text>
                            <Text style={styles.modalText}>Mediaction: {detail.medication}</Text>
                            <Text style={styles.modalText}>Fee: ${detail.fee}</Text>
                            <Text style={styles.modalText}>Date: {moment(detail.date).tz('Asia/Hong_Kong').format("YYYY-MM-DD HH:MM")}</Text>
                            <Button
                                title="Close"
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            />
                        </View>
                    </View>
                </Modal>
                <Picker
                    selectedValue={selectedDay}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedDay(itemValue);
                    }}
                >
                    <Picker.Item label="Please Select Period" value="" />
                    <Picker.Item label="Last 1 day" value="1" />
                    <Picker.Item label="Last 7 days" value="7" />
                    <Picker.Item label="Last 30 days" value="30" />
                </Picker>
                <View>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </>
    )
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: "absolute",
        left: 5
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        color: "black"
    },
    text: {
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: "black",
        borderStyle: "solid",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        display: "flex",
        justifyContent: "center",
        alignContent: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
});

