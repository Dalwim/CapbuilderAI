import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MockupScreen from './src/screens/MockupScreen';
import DesignScreen from './src/screens/DesignScreen';
import Model3DScreen from './src/screens/Model3DScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import SubscriptionScreen from './src/components/SubscriptionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mockup" component={MockupScreen} />
        <Stack.Screen name="Design" component={DesignScreen} />
        <Stack.Screen name="3DModel" component={Model3DScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
