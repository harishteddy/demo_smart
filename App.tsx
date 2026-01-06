/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import SmartechPushReact from 'smartech-push-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

const HomeScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Home Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.text}>Settings Screen</Text>
  </View>
);

export default function App() {
  useEffect(() => {
    // 🔹 Foreground notification
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      SmartechPushReact.handlePushNotification(
        remoteMessage,
        result => {
          console.log('FG handled by Smartech:', result);
        }
      );
    });

    // 🔹 App opened from killed state via notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          SmartechPushReact.handlePushNotification(
            remoteMessage,
            result => {
              console.log('Killed open handled by Smartech:', result);
            }
          );
        }
      });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <View testID="4#1" nativeID="hansel_ignore_view_overlay" />

        <NavigationContainer>
          <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 22, fontWeight: '600' },
});

























































// import React from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

// const Drawer = createDrawerNavigator();

// function HomeScreen() {
//   return (
//     <View style={styles.screen}>
//       <Text style={styles.text}>Home Screen</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={styles.screen}>
//       <Text style={styles.text}>Settings Screen</Text>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaProvider>
    
//        <View style={{ flex: 1 }}>
//         <View
//           testID="4#1"
//           nativeID="hansel_ignore_view_overlay"
//         />

//       <NavigationContainer>
//         <Drawer.Navigator initialRouteName="Home">
//           <Drawer.Screen name="Home" component={HomeScreen} />
//           <Drawer.Screen name="Settings" component={SettingsScreen} />
//         </Drawer.Navigator>
//       </NavigationContainer>
//          </View>
//     </SafeAreaProvider>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 22,
//     fontWeight: '600',
//   },
// });
















































// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// import {
//   SafeAreaProvider,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <SafeAreaProvider>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <AppContent />
//     </SafeAreaProvider>
//   );
// }

// function AppContent() {
//   const safeAreaInsets = useSafeAreaInsets();

//   return (
//     <View style={styles.container}>
//       <NewAppScreen
//         templateFileName="App.tsx"
//         safeAreaInsets={safeAreaInsets}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;
