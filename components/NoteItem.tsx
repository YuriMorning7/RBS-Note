    import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

    type Props = {
    id: string;
    title: string;
    description: string;
    onEdit: () => void;
    onDelete: () => void;
    };

    const NoteItem: React.FC<Props> = ({ title, description, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
        <View style={styles.topRow}>
            <Text style={styles.title} numberOfLines={1}>
            {title}
            </Text>
            <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                <Ionicons name="create-outline" size={22} color="#1e88e5" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                <Ionicons name="trash-outline" size={22} color="#e53935" />
            </TouchableOpacity>
            </View>
        </View>
        <Text style={styles.description} numberOfLines={4}>
            {description}
        </Text>
        </View>
    );
    };

    export default NoteItem;

    const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 14,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        flex: 1,
        color: '#2c2c2c',
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    actions: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    iconBtn: {
        marginLeft: 12,
        padding: 4,
        borderRadius: 6,
    },
    });
