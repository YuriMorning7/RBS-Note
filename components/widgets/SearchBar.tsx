    import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AppIcon from './AppIcon';

    type Props = {
    value: string;
    onChange: (text: string) => void;
    };

    const SearchBar: React.FC<Props> = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
        <AppIcon name="search-outline" size={20} color="#777" />
        <TextInput
            placeholder="Search notes..."
            placeholderTextColor="#aaa"
            style={styles.input}
            value={value}
            onChangeText={onChange}
            returnKeyType="search"
            autoCapitalize="none"
            clearButtonMode="while-editing"
        />
        </View>
    );
    };

    export default SearchBar;

    const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
    });
