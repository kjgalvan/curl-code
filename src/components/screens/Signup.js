import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import firebase from 'firebase';
import '@firebase/firestore';

export default class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    newUserSetup = (userId) => {
        const db = firebase.firestore();
        const ref = db.collection("rulesets").doc("default");
        db.collection("users").doc(userId).set({
            ruleset: ref
        })
    }

    handleSignUp = () => {
        const { email, password } = this.state
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((resp) => { this.newUserSetup(resp.user.uid) })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Username</Text>
                <Input value={this.state.name}
                    onChangeText={name => this.setState({ name })} title="Username: " leftIcon={
                        <Icon name='user' size={24} color='black' />} />
                <Text>E-mail</Text>
                <Input value={this.state.email}
                    onChangeText={email => this.setState({ email })} title="E-mail: " leftIcon={
                        <Icon name='plane' size={24} color='black' />} />
                <Text>Password</Text>
                <Input value={this.state.password}
                    onChangeText={password => this.setState({ password })} title="Password:" leftIcon={
                        <Icon name='key' size={24} color='black' />} />
                {/* <Text>Confirm Password</Text>
                <Input onpress={onClick} title="Password:" leftIcon={
                    <Icon name='lock' size={24} color='black' />} />
                <Button onPress={onClick} title="Register" /> */}
            </View>
        );
    }
}

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