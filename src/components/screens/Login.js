import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff0f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTop: {
    margin: 10,
  }
});

export default class Login extends React.Component {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Username</Text>
        <Input
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          title="Username:"
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          } />
        <Text>Password</Text>
        <Input
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          title="Password:"
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          } />
      </View>
    )
  }
}
