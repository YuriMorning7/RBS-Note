// navigation/AppNavigator.tsx
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useSelector } from 'react-redux';
import HomeScreen from '../app/HomeScreen';
import LoginScreen from '../app/login';
import { RootState } from '../store';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <NavigationContainer>
        {isAuthenticated ? (
            <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
            <Drawer.Screen name="Dashboard" component={HomeScreen} />
            </Drawer.Navigator>
        ) : (
            <LoginScreen />
        )}
        </NavigationContainer>
    );
}
