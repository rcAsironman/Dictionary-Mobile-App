import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import _ from 'lodash'
import { Audio } from 'expo-av'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../Theme/ThemeProvider';

export default function Result({ data }) {


    // const [definition, setDefinition] = useState(data[0].meanings[0].definitions[0].definition)
    // const [example, setExample] = useState(data[0].meanings[0].definitions[0].example)

    // console.log("In console ", data[0].meanings[0].definitions[0].definition)
    const [meanings, setMeanings] = useState([])
    const [definition, setDefinition] = useState({})
    const [keyValue, setKeyValue] = useState(-1)
    const [backgroundColor, setBackgroundColor] = useState("steelblue")
    const [sound, setSound] = useState<any>()
    const [audioUrl, setAudiUrl] = useState("")
    const {themeStyle} = useTheme();

    useEffect(() => {

        const fetchedData = data[0].meanings
        const firstObject = fetchedData.length >=0 ? fetchedData[0] : {};
        setDefinition(firstObject)
        setKeyValue(0)
        console.log("first object ", firstObject)
        setMeanings(fetchedData)
        for (let i = 0; i < data[0].phonetics.length; i++) {
            let url = data[0].phonetics[i].audio;
            let index = url.indexOf("-us")
            if (index != -1) {
                setAudiUrl(url)
            }
        }
    }, [data])




    useEffect(() => {
        return sound ?
            () => {
                console.log("unloading sound")
                sound.unloadAsync()
            } : undefined
    }, [sound])


    //functions
    async function playSound(url: string) {
        console.log("loading sound", url)
        const { sound } = await Audio.Sound.createAsync({ uri: url })

        setSound(sound)

        console.log("playing sound")
        await sound.playAsync();
    }



    return (
        <View style={[styles.resultBox, {backgroundColor: themeStyle.backgroundColor}]}>
            <ScrollView>

                {
                    audioUrl.length > 0 && (<TouchableOpacity
                        onPress={() => {
                            playSound(audioUrl)
                        }}
                    >
                        <View style={styles.audio}>
                            <Ionicons name='volume-high' size={25} color={themeStyle.color}/>
                            <Text style={{color: themeStyle.color}}>pronunciation</Text>
                        </View>
                    </TouchableOpacity>)
                }
                {/* <Text><Text style={styles.sideHeadings}>Parts Of Speech : </Text></Text> */}
                <View style={[styles.partOfSpeechBox]}>

                    {

                        meanings.map((data, key) => (
                           
                                <TouchableOpacity
                                    key={key}
                                    onPress={() => {
                                        setDefinition(data)
                                        setKeyValue(key)
                                    }}
                                >
                                    <View
                                        key={key}
                                        style={[styles.partOfSpeech, { backgroundColor: _.isEqual(keyValue, key) ? backgroundColor : "skyblue" }]}
                                    >
                                        <Text style={[{ color: _.isEqual(keyValue, key) ? "white" : "black" }]}>{data.partOfSpeech}</Text>
                                    </View>
                                </TouchableOpacity>
                           


                        ))
                    }
                </View>

                {/* if definition state variable length is greater than 0 then the below component is rendered */}
                {
                    definition["definitions"] != undefined && (
                        <View>
                            {
                                definition["definitions"].map((data, key: number) => (
                                    <View key={key} style={styles.defExamples}>
                                        <Text><Text style={[styles.sideHeadings, {color: themeStyle.color}]}>Definition : </Text><Text style={[styles.definition,{color: themeStyle.color}]}>{data.definition} {"\n"}</Text></Text>
                                        <Text><Text style={[styles.sideHeadings,{color: themeStyle.color}]}>Example   : </Text><Text style={[styles.definition,{color: themeStyle.color}]}>{data?.example ?? "No example available"}</Text></Text>
                                    </View>))
                            }
                        </View>
                    )

                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    resultBox: {
        backgroundColor: "white",
        height: "90%",
        width: "90%",
        borderRadius: 20,
        padding: 20,
        elevation: 5
    },
    sideHeadings: {
        fontWeight: "bold",

    },
    partOfSpeechBox: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    partOfSpeech: {
        backgroundColor: "skyblue",
        padding: 10,
        paddingHorizontal: 20,
        margin: 2,
        borderRadius: 10,
        shadowRadius: 10
    },
    defExamples: {
        padding: 10
    },
    definition: {
        padding: 20,
    },
    audio: {
        flexDirection: "row",

    }
})