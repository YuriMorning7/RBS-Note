// store/index.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './authSlice';
import notesReducer from './notesSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    notes: notesReducer,
    });

    const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'notes'], // what to persist
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false, // required for redux-persist
        }),
});

export const persistor = persistStore(store);

// 🔧 This is the fix for your AppNavigator error
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
