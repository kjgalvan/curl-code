import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Login() {
  onClick = () => {
  
  }

  /*const wording = "Enter User name:  ";*/
 


  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <Input onPress={onClick} title="Username : "   leftIcon={
    <Icon
      name='user'
      size={24}
      color='black'
    />
  }/>
      <Text>Password</Text> 
      <Input onpress={onClick} title= "Password:"   leftIcon={
    <Icon
      name='lock'
      size={24}
      color='black'
    />
  } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:3,
    backgroundColor: '#fff0f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTop: {
    margin: 10,
  }
});
