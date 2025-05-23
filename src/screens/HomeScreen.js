import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Generar Mockup" onPress={() => navigation.navigate('Mockup')} />
      <Button title="Diseñar Gorra" onPress={() => navigation.navigate('Design')} />
      <Button title="Modelo 3D" onPress={() => navigation.navigate('3DModel')} />
      <Button title="Chatbot de Marca" onPress={() => navigation.navigate('Chatbot')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 16,
  },
});
