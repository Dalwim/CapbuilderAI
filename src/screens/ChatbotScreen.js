import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useSubscription } from '../components/SubscriptionManager';
import SubscriptionScreen from '../components/SubscriptionScreen';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { chatbotUses, incrementChatbotUse, isSubscribed } = useSubscription();

  useEffect(() => {
    if (!isSubscribed && chatbotUses >= 8) {
      Alert.alert(
        'Límite alcanzado',
        'Has alcanzado el límite de uso gratuito del chatbot. Por favor, suscríbete para continuar usando todas las funciones de la app.',
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
    }
  }, [chatbotUses, isSubscribed]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    if (!isSubscribed && chatbotUses >= 8) {
      Alert.alert(
        'Límite alcanzado',
        'Has alcanzado el límite de uso gratuito del chatbot. Por favor, suscríbete para continuar usando todas las funciones de la app.',
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
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      
      if (!isSubscribed) {
        await incrementChatbotUse();
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: newMessages
        })
      });

      if (!response.ok) {
        throw new Error('Error al obtener respuesta del chatbot');
      }

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages([...newMessages, botMessage]);
      setInput("");
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener respuesta del chatbot. Por favor, intenta de nuevo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      {messages.map((msg, index) => (
        <Text key={index} style={{ marginBottom: 10 }}>
          {msg.role === "user" ? "Tú: " : "IA: "}{msg.content}
        </Text>
      ))}
      <View style={{ marginTop: 20 }}>
        <TextInput 
          placeholder="Habla con el chatbot" 
          value={input} 
          onChangeText={setInput} 
          style={{ marginBottom: 10 }}
        />
        <Button 
          title={isLoading ? "Enviando..." : "Enviar"} 
          onPress={handleSend}
          disabled={isLoading}
        />
        {isLoading && (
          <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 10 }} />
        )}
      </View>
    </ScrollView>
  );
}
    if (!input.trim()) return;
    
    try {
      setIsLoading(true);
      const newMessages = [...messages, { role: "user", content: input }];
      setMessages(newMessages);
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: newMessages
        })
      });

      if (!response.ok) {
        throw new Error('Error al obtener respuesta del chatbot');
      }

      const data = await response.json();
      const botMessage = data.choices[0].message;
      setMessages([...newMessages, botMessage]);
      setInput("");
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener respuesta del chatbot. Por favor, intenta de nuevo.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      {messages.map((msg, index) => (
        <Text key={index} style={{ marginBottom: 10 }}>
          {msg.role === "user" ? "Tú: " : "IA: "}{msg.content}
        </Text>
      ))}
      <View style={{ marginTop: 20 }}>
        <TextInput 
          placeholder="Habla con el chatbot" 
          value={input} 
          onChangeText={setInput} 
          style={{ marginBottom: 10 }}
        />
        <Button 
          title={isLoading ? "Enviando..." : "Enviar"} 
          onPress={sendMessage}
          disabled={isLoading}
        />
        {isLoading && (
          <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 10 }} />
        )}
      </View>
    </ScrollView>
  );
}
