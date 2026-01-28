import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image } from 'react-native';
import SplashScreen from './components/SplashScreen'
import OfflineScreen from './components/OfflineScreen'
import WebView  from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import { Dimensions, Platform } from 'react-native';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function App() {
    const [isConnected, setIsConnected] = useState(null);
    const [webLoading, setWebLoading] = useState(true);   
    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(state.isConnected);
      });

      return () => unsubscribe();
    }, []);
    if (isConnected === null) {
      return (
        <View style={styles.container}>
          <SplashScreen></SplashScreen>
        </View>
      );
    }
    if (!isConnected) {
        return (
          <View style={styles.container}>
            <OfflineScreen></OfflineScreen>
          </View>
        );
    }
     const INJECTED_JS = `
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.getElementsByTagName('head')[0].appendChild(meta);
      true;
    `;
      return (
    <SafeAreaView style={{ flex: 1 }}>     

    <WebView
      source={{ uri: 'https://hoorapp.com' }}
      injectedJavaScript={INJECTED_JS}
      onMessage={(event) => {}} // گاهی برای اجرای صحیح injectedJavaScript لازم است
      style={{ flex: 1 }}
    />
    </SafeAreaView>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
