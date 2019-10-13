import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';

export default class Product extends React.Component {
  render() {
    const dbh = firebase.firestore();

    dbh.collection("products").doc("test").set({
      name: "hi"
    })
    .then(function() {
    })
    .catch(function(error) {
    });

    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Type {JSON.stringify(navigation.getParam('barCodeType', 'no type'))}</Text>
        <Text>Type {JSON.stringify(navigation.getParam('productBarCode', '00'))}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
