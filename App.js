import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './components/SplashScreen'
import OfflineScreen from './components/OfflineScreen'
import WebView from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorScreen from './components/Error';

export default function App() {
    const [isConnected, setIsConnected] = useState(null);
    const [minimumTimePassed, setMinimumTimePassed] = useState(false);
    const [hasWebViewError, setHasWebViewError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const webViewRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinimumTimePassed(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    // چک کردن اتصال به اینترنت
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    const handleRetry = () => {
        setHasWebViewError(false);
        setIsLoading(true);
        if (webViewRef.current) {
            webViewRef.current.reload();
        }
    };

    const handleWebViewError = (syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error('WebView error:', nativeEvent);
        setHasWebViewError(true);
        setIsLoading(false);
    };

    const handleLoadEnd = () => {
        setIsLoading(false);
    };

    if (isConnected === null || !minimumTimePassed) {
        return (
            <View style={styles.container}>
                <SplashScreen />
            </View>
        );
    }

    if (!isConnected) {
        return (
            <View style={styles.container}>
                <OfflineScreen />
            </View>
        );
    }

    if (hasWebViewError) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ErrorScreen onRetry={handleRetry} />
            </SafeAreaView>
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
                ref={webViewRef}
                source={{ uri: 'https://web.hoorapp.com/' }}
                injectedJavaScript={INJECTED_JS}
                onMessage={(event) => {}}
                style={{ flex: 1 }}
                onError={handleWebViewError}
                onLoadEnd={handleLoadEnd}
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <SplashScreen />
                    </View>
                )}
                onHttpError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    if (nativeEvent.statusCode >= 400) {
                        setHasWebViewError(true);
                    }
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});