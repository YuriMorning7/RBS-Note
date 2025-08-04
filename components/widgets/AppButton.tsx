// components/widgets/AppButton.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    };

    const AppButton: React.FC<Props> = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.label}>{title}</Text>
        </TouchableOpacity>
    );
    };

    export default AppButton;

    const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2e65f3',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    label: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
