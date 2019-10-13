import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, ActivityIndicator } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';

export default class Product extends React.Component {
  render() {
    const { navigation } = this.props;

    const db = firebase.firestore();
    const barcode = navigation.getParam('productBarCode', '')

    console.log("hi2");

    db.collection("products").where("barcode", "==", barcode)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    return (
      <View>
        <Image
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }
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