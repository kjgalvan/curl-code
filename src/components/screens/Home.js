import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';

export default function Home() {
  onClick = () => {
    Alert.alert("Continue");
  }

  const wording = "Login";


  return (
    <View style={styles.container}>
      <Text>Have an account?</Text>
      <Button style={styles.buttonTop} onPress={onClick} title={wording} />
      <Text>or</Text>
      <Button onPress={onClick} title="Register" />
      <Text> to continue</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTop: {
    margin: 10,
  }
});
