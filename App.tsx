// App.tsx (simplified for testing)
import {
    Raleway_400Regular,
    Raleway_700Bold,
    useFonts,
} from '@expo-google-fonts/raleway';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './navigation/AppNavigator';
import { persistor, store } from './store';

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
