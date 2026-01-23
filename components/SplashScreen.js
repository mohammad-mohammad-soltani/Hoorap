import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";

const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    'Vazir': require('../assets/fonts/Vazir-Thin-FD-WOL.ttf'),
  });

  // ۱. تعریف مقادیر انیمیشن
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current; 

  useEffect(() => {
    if (fontsLoaded) {
      // ۲. اجرای همزمان انیمیشن‌ها
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000, 
          
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../assets/splash.png')}
          resizeMode="contain"
          style={[
            styles.splashImage,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }] 
            }
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 250,
    height: 250,
  },
});

export default SplashScreen;