import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/components/screens/Home';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
});

export default createAppContainer(AppNavigator);

// export default function App() {
//   return (
//     <Home />
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
