import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Button, ButtonGroup } from 'react-native-elements';

export default class BarCodeScan extends React.Component {
    render() {
        return (
        <View style={styles.container}>
            <Text>Test the Bar Code Scanning!</Text>
            <Button
            title="Go to bar code scanner"
            onPress={() => this.props.navigation.navigate('BarCodeScanner')}
            />
        </View>
        );
    }
}