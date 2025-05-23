import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PayPalCheckout } from 'react-native-paypal-checkout';
import { PAYPAL_CONFIG, PRICES } from '../../config/config';

export default function SubscriptionScreen({ onSubscribe }) {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const handlePayment = async () => {
    try {
      const response = await PayPalCheckout.open({
        clientId: PAYPAL_CONFIG.CLIENT_ID,
        environment: PAYPAL_CONFIG.ENVIRONMENT,
        currency: 'USD',
        intent: 'CAPTURE',
        purchaseUnits: [{
          amount: {
            currency_code: 'USD',
            value: PRICES[selectedPlan.toUpperCase()]
          }
        }]
      });

      if (response.status === 'COMPLETED') {
        onSubscribe();
        Alert.alert('¡Éxito!', '¡Gracias por tu suscripción!');
      }
    } catch (error) {
      console.error('Error en el pago:', error);
      Alert.alert('Error', 'Hubo un error en el proceso de pago');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Planes de Suscripción</Text>

      <View style={styles.planContainer}>
        <TouchableOpacity
          style={[styles.plan, selectedPlan === 'monthly' && styles.selectedPlan]}
          onPress={() => setSelectedPlan('monthly')}
        >
          <Text style={styles.planTitle}>Mensual</Text>
          <Text style={styles.price}>${PRICES.MONTHLY}/mes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.plan, selectedPlan === 'annual' && styles.selectedPlan]}
          onPress={() => setSelectedPlan('annual')}
        >
          <Text style={styles.planTitle}>Anual</Text>
          <Text style={styles.price}>${PRICES.ANNUAL}/año</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.plan, selectedPlan === 'lifetime' && styles.selectedPlan]}
          onPress={() => setSelectedPlan('lifetime')}
        >
          <Text style={styles.planTitle}>Vitalicia</Text>
          <Text style={styles.price}>${PRICES.LIFETIME} una vez</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pagar con PayPal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  planContainer: {
    marginBottom: 20,
  },
  plan: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    elevation: 3,
  },
  selectedPlan: {
    backgroundColor: '#007bff',
    borderColor: '#0056b3',
  },
  planTitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
