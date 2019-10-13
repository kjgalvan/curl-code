import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Register() {
  onClick = () => {
  
  }

  return (
    <View style={styles.container}>
    <Text>Username</Text>
    <Input onPress={onClick} title="Username : "   leftIcon={
    <Icon name='user'size={24} color='black'/>}/>
    <Text>E-mail</Text>
    <Input onPress={onClick} title="E-mail : "   leftIcon={
    <Icon name='plane'size={24} color='black'/>}/>
    <Text>Password</Text> 
    <Input onpress={onClick} title= "Password:"   leftIcon={
    <Icon name='key'size={24} color='black'/> } />
    <Text>Confirm Password</Text>
    <Input onpress={onClick} title= "Password:"   leftIcon={
    <Icon name='lock'size={24} color='black'/> } />
    <Button onPress={onClick} title="Register" />
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