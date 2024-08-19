import React, {useState} from 'react'
import { Switch, StyleSheet, Text, View } from 'react-native'
import { useTheme } from '../Theme/ThemeProvider';





export default function Settings() {

  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, themeStyle, toggleTheme} = useTheme();

  function toggle(){
    toggleTheme();
    setIsEnabled((previousValue) => (!previousValue))
  }

  return (
    <View style={[styles.container, {backgroundColor: themeStyle.backgroundColor}]}>
      <Text style={[styles.themeText, {color: themeStyle.color}]}>{theme}</Text>
      <View style={styles.switch}>
      <Switch
        value={isEnabled}
        onValueChange={toggle}
        trackColor={{false: "grey", true: "white"}}
        thumbColor={themeStyle.color}
        
      />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  themeText:{
    fontSize: 25,

  },
  switch:{
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  }
})
