import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import firebase from 'firebase';
import '@firebase/firestore';

export default class Product extends React.Component {
  render() {
    const { navigation } = this.props;

    const db = firebase.firestore();
    var barcode = navigation.getParam('productBarCode', '')

    if (barcode.length === 12) {
      barcode = "0" + barcode;
    }

    db.collection("products").where("barcode", "==", barcode)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

    return (
      <View style={styles.container}>
        <Text>Type {JSON.stringify(navigation.getParam('barCodeType', 'no type'))}</Text>
        <Text>Type {barcode}</Text>
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
