import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ActivityIndicator, Pressable } from 'react-native';
import { useFonts } from "expo-font";

const OfflineScreen = () => {
  const [fontsLoaded] = useFonts({
    'Vazir': require('../assets/fonts/Vazir-Thin-FD-WOL.ttf'),
    'VazirBold' : require('../assets/fonts/Vazir-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
        <View style={{display:'flex' , flexDirection:'column' , justifyContent: 'center' , alignItems:'center'}} >
            <Image
            source = {require('../assets/net.png')} 
            style = {{width:100 , height:100}}
            /> 
            <Text style={styles.title} >اتصال اینترنت برقرار نیست</Text>
            <View style={{height:10}} ></View>      
            <Text style={styles.text} >به نظر میرسد اینترنت شما قطع است. 
            لطفا اتصال خود را بررسی کرده و دوباره تلاش کنید. </Text>
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
        fontFamily: "VazirBold",
        fontSize : 20,
        color: '#c40014',
        padding: 5,
        paddingHorizontal : 15,
        borderRadius : 40
    },
    text : {
        fontFamily : "Vazir",
        fontSize : 9,
        textAlign : 'center'
    },
    button:{
        backgroundColor:'#68f184',
        padding:5,
        paddingHorizontal: 15,
        borderRadius:10
    }
});

export default OfflineScreen;
