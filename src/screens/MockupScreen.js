import React, { useState } from 'react';
import { View, Button, Image, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useSubscription } from '../components/SubscriptionManager';

export default function MockupScreen() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isSubscribed } = useSubscription();

  const generateMockup = async () => {
    if (!isSubscribed) {
      Alert.alert(
        'Suscripción necesaria',
        'Esta función está disponible solo para usuarios suscritos. Por favor, suscríbete para acceder a todas las funciones de la app.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Suscribirme',
            onPress: () => navigation.navigate('Subscription'),
          },
        ]
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
        method: 'POST',
        headers: { 
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: prompt })
      });

      if (!response.ok) {
        throw new Error('Error al generar la imagen');
      }

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar la imagen. Por favor, intenta de nuevo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockup = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2', {
        method: 'POST',
        headers: { 
          Authorization: 'Bearer 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',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: prompt })
      });

      if (!response.ok) {
        throw new Error('Error al generar la imagen');
      }

      const blob = await response.blob();
      setImage(URL.createObjectURL(blob));
    } catch (error) {
      Alert.alert('Error', 'No se pudo generar la imagen. Por favor, intenta de nuevo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput 
        placeholder="Describe tu gorra" 
        value={prompt} 
        onChangeText={setPrompt} 
        style={{ marginBottom: 20 }}
      />
      <Button 
        title={isLoading ? "Generando..." : "Generar Mockup"} 
        onPress={generateMockup}
        disabled={isLoading}
      />
      {isLoading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {image && !isLoading && (
        <Image 
          source={{ uri: image }} 
          style={{ width: 300, height: 300, marginTop: 20 }}
        />
      )}
    </View>
  );
}
