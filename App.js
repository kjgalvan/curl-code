import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import Ingr from './src/components/screens/Ingr';

export default function App() {
  return (
    <ThemeProvider>
      <Ingr />
      </ThemeProvider>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
