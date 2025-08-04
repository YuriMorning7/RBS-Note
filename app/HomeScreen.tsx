    import React, { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { addNote, deleteNote, updateNote } from '../store/notesSlice';
import { Note } from '../types/types';

import AddNoteModal from '../components/AddNoteModal';
import NoteItem from '../components/NoteItem';
import AppIcon from '../components/widgets/AppIcon';
import AppText from '../components/widgets/AppText';
import EmptyState from '../components/widgets/EmptyState';
import SearchBar from '../components/widgets/SearchBar';

    const screenHeight = Dimensions.get('window').height;

    const HomeScreen = () => {
    const dispatch = useDispatch();
    const notes = useSelector((state: RootState) => state.notes.notes);

    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editNote, setEditNote] = useState<Note | null>(null);

    const filteredNotes = notes.filter((note) =>
        `${note.title} ${note.description}`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAdd = () => {
        setEditNote(null);
        setModalVisible(true);
    };

    const handleSubmit = (title: string, description: string) => {
        if (editNote) {
        dispatch(updateNote({ ...editNote, title, description }));
        } else {
        dispatch(addNote({ id: uuid.v4().toString(), title, description }));
        }
        setModalVisible(false);
    };

    const handleEdit = (note: Note) => {
        setEditNote(note);
        setModalVisible(true);
    };

    const handleDelete = (id: string) => {
        dispatch(deleteNote(id));
    };

    return (
        <View style={styles.container}>
        <AppText weight="bold" style={styles.header}>
            Your Notes
        </AppText>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <View style={styles.content}>
            {filteredNotes.length === 0 ? (
            <View style={styles.emptyWrapper}>
                <EmptyState onAdd={handleAdd} />
            </View>
            ) : (
            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                <NoteItem
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item.id)}
                />
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            )}
        </View>

        <TouchableOpacity style={styles.fab} onPress={handleAdd}>
            <AppIcon name="add" size={30} color="#fff" />
        </TouchableOpacity>

        <AddNoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        noteToEdit={editNote}
        />

        </View>
    );
    };

    export default HomeScreen;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
    },
    content: {
        flex: 1,
    },
    emptyWrapper: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: screenHeight * 0.15,
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 40,
        backgroundColor: '#2e65f3',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    });
