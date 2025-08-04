// components/widgets/EmptyState.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    onAdd: () => void;
    };

    const EmptyState: React.FC<Props> = ({ onAdd }) => {
    return (
        <View style={styles.container}>
        <Text style={styles.message}>No notes yet.</Text>
        </View>
    );
    };

    export default EmptyState;

    const styles = StyleSheet.create({
    container: {
        marginTop: 80,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        marginBottom: 12,
        color: '#999',
    },
});
