import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import BottomTab from './components/Bottom-Tab/BottomTab';
import Home from './components/screens/Home';
import Settings from './components/screens/Settings';
import { ThemeProvider } from './components/Theme/ThemeProvider';

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <SafeAreaView style={styles.safeArea}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
            >
              <Stack.Screen name="Landing" component={BottomTab} />
            </Stack.Navigator>
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </ThemeProvider>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  safeArea: {
    flex: 1,
    backgroundColor: "white"
  }
});
