import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { SUBSCRIPTION_LIMITS } from '../config/config';

export const useSubscription = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [chatbotUses, setChatbotUses] = useState(0);

  useEffect(() => {
    loadSubscriptionState();
  }, []);

  const loadSubscriptionState = async () => {
    try {
      const subscribed = await AsyncStorage.getItem('isSubscribed');
      const uses = await AsyncStorage.getItem('chatbotUses');
      
      setIsSubscribed(subscribed === 'true');
      setChatbotUses(uses ? parseInt(uses) : 0);
    } catch (error) {
      console.error('Error loading subscription state:', error);
    }
  };

  const incrementChatbotUse = async () => {
    if (isSubscribed) return;

    if (chatbotUses < SUBSCRIPTION_LIMITS.CHATBOT_FREE_TRIAL) {
      setChatbotUses(chatbotUses + 1);
      await AsyncStorage.setItem('chatbotUses', (chatbotUses + 1).toString());
    } else {
      Alert.alert(
        'Límite alcanzado',
        'Has alcanzado el límite de uso gratuito del chatbot. Por favor, suscríbete para continuar usando todas las funciones de la app.'
      );
    }
  };

  const subscribe = async () => {
    setIsSubscribed(true);
    await AsyncStorage.setItem('isSubscribed', 'true');
    await AsyncStorage.setItem('chatbotUses', '0');
  };

  const checkSubscription = () => {
    return isSubscribed || chatbotUses < SUBSCRIPTION_LIMITS.CHATBOT_FREE_TRIAL;
  };

  return {
    isSubscribed,
    chatbotUses,
    incrementChatbotUse,
    subscribe,
    checkSubscription
  };
};
