import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Home from '../screens/Home'
import Settings from '../screens/Settings'
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons
import { useTheme } from '../Theme/ThemeProvider'
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createMaterialTopTabNavigator()

export default function BottomTab() {

  const {themeStyle} = useTheme();

  return (
    <Tab.Navigator
    tabBarPosition='bottom'
   
    screenOptions={({route})=>({
  
        headerShown: false,
        tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline'; // Normal and outline icons for Home
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline'; // Normal and outline icons for Settings
              }
  
              // Return the icon component
              return <Ionicons name={iconName} size={20} color={themeStyle.color} />;
            },
            tabBarLabelStyle:{
              fontSize: 12,
              fontWeight: 700
            },
            tabBarActiveTintColor: themeStyle.color,
            tabBarInactiveTintColor: 'gray',
            tabBarHideOnKeyboard: true,
            tabBarStyle: {backgroundColor: themeStyle.backgroundColor},
            tabBarIndicatorStyle:{
              height: 0
            }
          
    })
  
  }
    >
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="Settings" component={Settings}/>
    </Tab.Navigator>
  )
}
