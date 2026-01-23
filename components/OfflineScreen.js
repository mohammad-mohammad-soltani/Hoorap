import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator, Pressable } from 'react-native';
import { useFonts } from "expo-font";

const OfflineScreen = () => {
  const [fontsLoaded] = useFonts({
    'Vazir': require('../assets/fonts/Vazir-Thin-FD-WOL.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
        <View style={{display:'flex' , flexDirection:'column' , justifyContent: 'center' , alignItems:'center'}} >
            <Text style={styles.title} >اتصال اینترنت یافت نشد</Text>
            <View style={{height:10}} ></View>      
            <Text style={styles.text} >برای استفاده از "هوراپ" شما باید به اینترنت متصل باشید.</Text>
            <Text style={styles.text} >پس از اتصال به اینترنت ، هوراپ به طور خودکار بارگذاری میشود.</Text>

        </View>
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
    title : {
        fontFamily: "Vazir",
        fontSize : 20,
        backgroundColor : '#c40014',
        color: 'white',
        padding: 5,
        paddingHorizontal : 15,
        borderRadius : 40
    },
    text : {
        fontFamily : "Vazir"
    },
    button:{
        backgroundColor:'#68f184',
        padding:5,
        paddingHorizontal: 15,
        borderRadius:10
    }
});

export default OfflineScreen;
