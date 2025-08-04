    import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { noteSchema } from '../utils/validation';

    type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (title: string, description: string) => void;
    noteToEdit?: { title: string; description: string } | null;
    };

    const AddNoteModal: React.FC<Props> = ({ visible, onClose, onSubmit, noteToEdit }) => {
    const [title, setTitle] = useState(noteToEdit?.title ?? '');
    const [description, setDescription] = useState(noteToEdit?.description ?? '');
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    const resetState = () => {
        setTitle('');
        setDescription('');
        setErrors({});
    };

    const handleConfirm = () => {
        const result = noteSchema.safeParse({ title: title.trim(), description: description.trim() });

        if (!result.success) {
        const formatted = result.error.format();
        setErrors({
            title: formatted.title?._errors[0],
            description: formatted.description?._errors[0],
        });
        return;
        }

        onSubmit(title.trim(), description.trim());
        resetState();
    };

    const handleCancel = () => {
        onClose();
        resetState();
    };

    // Reset fields on modal open with current values
    React.useEffect(() => {
        if (visible) {
        setTitle(noteToEdit?.title ?? '');
        setDescription(noteToEdit?.description ?? '');
        setErrors({});
        }
    }, [visible, noteToEdit]);

    return (
        <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.overlay}>
            <View style={styles.modal}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={(text) => {
                setTitle(text);
                setErrors((prev) => ({ ...prev, title: undefined }));
                }}
            />
            {errors.title && <Text style={styles.error}>{errors.title}</Text>}

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={(text) => {
                setDescription(text);
                setErrors((prev) => ({ ...prev, description: undefined }));
                }}
            />
            {errors.description && <Text style={styles.error}>{errors.description}</Text>}

            <View style={styles.buttons}>
                <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirm} onPress={handleConfirm}>
                <Text style={styles.confirmText}>Save</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
        </Modal>
    );
    };

    export default AddNoteModal;

    const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        marginBottom: 8,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    error: {
        color: '#e53935',
        fontSize: 12,
        marginBottom: 8,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 12,
    },
    cancel: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#ddd',
        borderRadius: 6,
    },
    confirm: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#2e65f3',
        borderRadius: 6,
    },
    cancelText: {
        color: '#333',
        fontWeight: '500',
    },
    confirmText: {
        color: '#fff',
        fontWeight: '500',
    },
    });
