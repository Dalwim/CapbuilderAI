import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { AdMobInterstitial } from 'react-native-admob';
import { AD_CONFIG } from '../config/adConfig';

export default function InterstitialAd() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AdMobInterstitial.setAdUnitID(AD_CONFIG.REWARDED_AD_ID);
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    
    AdMobInterstitial.addEventListener('adLoaded', () => {
      setIsLoaded(true);
    });

    AdMobInterstitial.addEventListener('adFailedToLoad', (error) => {
      console.error('Error al cargar anuncio intersticial:', error);
    });

    AdMobInterstitial.addEventListener('adOpened', () => {
      console.log('Anuncio intersticial abierto');
    });

    AdMobInterstitial.addEventListener('adClosed', () => {
      console.log('Anuncio intersticial cerrado');
    });

    return () => {
      AdMobInterstitial.removeAllListeners();
    };
  }, []);

  const showAd = async () => {
    if (!isLoaded) {
      Alert.alert('Error', 'El anuncio aún no está listo');
      return;
    }

    try {
      await AdMobInterstitial.showAd();
    } catch (error) {
      console.error('Error al mostrar anuncio:', error);
    }
  };

  return {
    isLoaded,
    showAd
  };
}
