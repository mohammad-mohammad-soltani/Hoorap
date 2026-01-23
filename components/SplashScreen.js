import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { useFonts } from "expo-font";

const SplashScreen = () => {
  const [fontsLoaded] = useFonts({
    'Vazir': require('../assets/fonts/Vazir-Thin-FD-WOL.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={{display:'flex' , justifyContent:'center' , alignItems:'center' , height:800}} >
        <Text style={styles.text}>در حال بارگذاری هوراپ !</Text>
        <View style={styles.logo}>
          <Image
            style={{ width: 300 }}
            source={require('../assets/icon.png')}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={styles.text2}>© 2026 - تمامی حقوق محفوظ است</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column'
  },
  logo: {
    aspectRatio: 1,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  text: {
    color:'black',
    fontSize: 17,
    fontFamily: 'Vazir',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },
  text2: {
    color:'black',
    fontSize: 17,
    fontFamily: 'Vazir',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:'auto'
  },
});

export default SplashScreen;
