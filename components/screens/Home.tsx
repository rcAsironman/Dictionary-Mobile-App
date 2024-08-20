import React,{useEffect, useState} from 'react'
import { ToastAndroid ,StatusBar,Keyboard,StyleSheet,Text, View,TextInput, TouchableOpacity, YellowBox, } from 'react-native'
import axios from 'axios';
import Result from '../Reuseble-components/Result';
import LottieView from 'lottie-react-native';
import gloab from "../../lottie/gloab.json"
import { useTheme } from '../Theme/ThemeProvider';




YellowBox.ignoreWarnings

export default function Home() {

    const [word, setWord] = useState("");
    const [result, setResult] = useState([]);
    const {theme,themeStyle} = useTheme()
    const [wordNotFound, setWordNotFound] = useState("")

    useEffect(()=>{
        if(word.length == 0)
        {
            setResult([])
        }
    },[word])
  console.log(word.length)

   
    async function fetchApi(){
        Keyboard.dismiss();
        console.log("In fetch Api function")
       await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
       .then((response)=>{
        console.log(response)
        setResult([])
        setResult(response.data)
       })
       .catch((error)=>{
        console.log("in catch block ",error)
        setWordNotFound("No results found")
        showToast()
       })
       
       
     }

     const showToast = () => {
        ToastAndroid.show(wordNotFound, ToastAndroid.SHORT)
     }
  return (
    
      <View style={[styles.container, {backgroundColor: themeStyle.backgroundColor}]}>

        <StatusBar
        backgroundColor={theme == "light" ? "#fff" : "black"}
        barStyle={theme == "light" ? "dark-content" : "light-content"}
        />
        {/* //This container is for Logo */}
            <View style={styles.logoContainer}>
            <Text style={[styles.logo, {color: themeStyle.color}]}>Dictionary</Text>
            </View>

            {/* search box */}
            <View style={styles.searchBox}>
                    <TextInput 
                     placeholder='Search the word here'
                     value={word}
                     onChangeText={setWord}
                     style={[styles.searchContainer, {color: themeStyle.color}, {borderColor: themeStyle.color}]}
                     cursorColor={"black"}
                     placeholderTextColor={themeStyle.color}
                    />
                    <TouchableOpacity
                        onPress={fetchApi}
                        style={[styles.searchBtn, {backgroundColor: themeStyle.color}]} 
                    >
                        <Text style={[styles.searchTxt, {color: themeStyle.backgroundColor}]}>search</Text>
                    </TouchableOpacity>
            </View>

            {
                result.length >0 && word.length >0? ( <View style={styles.resultBox}>
                    <Result data={result}/>
                    </View>) : (
                        <View style={styles.initialSearchBox}>
                            <Text style={[styles.searchSomethingTxt, {color: themeStyle.color}]}>
                                Search Something here
                            </Text>
                            <View><LottieView source={gloab} autoPlay loop style={styles.gloab}/></View>
                        </View>
                    )
            }
      </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "white"

    },
    logo:{
        fontSize: 21,
        fontWeight: "700"
    },
    logoContainer:{
        justifyContent: "center",
        alignItems: "center"
    },
    searchBox:{
        flexDirection: "row",
        padding: 20
    },
    searchContainer:{
        borderWidth: 2,
        padding: 5,
        width: "70%",
        fontSize: 15,
        fontWeight: "500",
        paddingLeft: 20
    },
    searchBtn:{
       backgroundColor: "black",
       width: "30%",
       justifyContent: "center",
       alignItems: "center",
       marginHorizontal: 10,
       
    },
    searchTxt:{
        fontWeight: "500",
        fontSize: 15,
        color: "white"
    },
    resultBox:{
        height: "70%",
        width: "100%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    searchSomethingTxt:{
        fontWeight: "300",
        fontSize: 55,
        elevation: 5
    },
    initialSearchBox:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100
    },
    gloab:{
        width: 80,
        height: 80,
        top: -70,
        left: 10
    }
})