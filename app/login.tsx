    import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TextStyle,
    TouchableOpacity,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { loginSchema } from '../utils/validation';

    const LoginScreen = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(true);
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

    // Check if user has logged in before
    useEffect(() => {
        const checkFirstLogin = async () => {
        const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');
        setIsFirstTime(!hasLoggedIn);
        };
        checkFirstLogin();
    }, []);

    const handleLogin = async () => {
        const result = loginSchema.safeParse({ username, password });

        if (!result.success) {
        const formatted = result.error.format();
        setErrors({
            username: formatted.username?._errors[0],
            password: formatted.password?._errors[0],
        });
        return;
        }

        if (username !== 'test' || password !== 'password123') {
        Alert.alert('Invalid Credentials', 'Username or password is incorrect.');
        return;
        }

        await AsyncStorage.setItem('hasLoggedIn', 'true');
        dispatch(login({ username }));
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>{isFirstTime ? 'Welcome' : 'Welcome Back'}</Text>

        <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={(text) => {
            setUsername(text);
            setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            autoCapitalize="none"
        />
        {errors.username && <Text style={styles.error}>{errors.username}</Text>}

        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>
    );
    };

    export default LoginScreen;

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#fefefe',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2e65f3',
        alignSelf: 'center',
        marginBottom: 32,
    },
    input: {
        backgroundColor: '#f0f2f5',
        padding: 14,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 10,
        borderColor: '#e0e0e0',
        borderWidth: 1,
    },
    error: {
        color: '#e53935',
        fontSize: 12,
        marginBottom: 10,
    } as TextStyle,
    button: {
        backgroundColor: '#2e65f3',
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    });
