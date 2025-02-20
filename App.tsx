import React from 'react';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from '@src/screens/home';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer fallback={<Text>Loading...</Text>}>
          <StatusBar backgroundColor="#4c669f" barStyle="light-content" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
