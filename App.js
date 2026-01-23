import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View , Image } from 'react-native';
import SplashScreen from './components/SplashScreen'
import OfflineScreen from './components/OfflineScreen'
import WebView  from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Constants from 'expo-constants';

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
      return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://digikala.com' }}
        style={{ flex: 1  ,     marginTop: Constants.statusBarHeight}}
        onLoadStart={() => setWebLoading(true)} 
        onLoadEnd={() => setWebLoading(false)}  
        
      />
      {webLoading && (
          <View style={StyleSheet.absoluteFillObject}>
            <SplashScreen></SplashScreen>
          </View>
      )}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    paddingTop:19,
    flex: 1,
  },
});
