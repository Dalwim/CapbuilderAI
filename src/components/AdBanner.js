import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AdMobBanner } from 'react-native-admob';
import { AD_CONFIG } from '../config/adConfig';

export default function AdBanner() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Inicializar AdMob
    if (!isLoaded) {
      AdMobBanner.setTestDeviceID('EMULATOR');
      setIsLoaded(true);
    }
  }, [isLoaded]);

  return (
    <View style={styles.container}>
      <AdMobBanner
        bannerSize={AD_CONFIG.banner.type}
        adUnitID={AD_CONFIG.REWARDED_AD_ID}
        testDeviceID="EMULATOR"
        didFailToReceiveAdWithError={(error) => console.error(error)}
        style={styles.banner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    width: '100%',
    height: 50,
  },
});
