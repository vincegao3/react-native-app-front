import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomePage from './Page/WelcomePage';
import RegisterPage from './Page/RegisterPage';
import LoginPage from './Page/LoginPage';
import HomePage from './Page/HomePage';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen options={{ headerLargeTitle: true }} name="RegisterPage" component={RegisterPage} />
        <Stack.Screen options={{ headerLargeTitle: true }} name="LoginPage" component={LoginPage} />
        <Stack.Screen name="HomePage" component={HomePage} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
