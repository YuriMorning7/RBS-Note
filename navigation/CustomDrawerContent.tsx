// navigation/CustomDrawerContent.tsx
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/authSlice';

    const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const username = useSelector((state: RootState) => state.auth.username);
    const dispatch = useDispatch();

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
        <View style={styles.profile}>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.role}>User</Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.footer}>
            <Button title="Logout" onPress={() => dispatch(logout())} />
        </View>
        </DrawerContentScrollView>
    );
    };

    export default CustomDrawerContent;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profile: {
        marginTop: 40,
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    role: {
        color: '#666',
    },
    spacer: {
        flex: 1,
    },
    footer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});
