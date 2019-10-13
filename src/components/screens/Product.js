import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
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
      <View style={styles.container}>
        <Image source={{ uri: "https://www.okaypurenaturals.com/okay-hemp-seed-shea-softening-anti-breakage-shampoo-helps-stimulate-hair-growth-moisturize-hair-scalp-prevents-breakage-sulfate-silicone-paraben-free-for-all-hair-types-and-textures-made-in-usa-12oz-355ml/" }}
          style={{ width: 200, height: 200 }} />
        <Image source={{ uri: "https://www.okaypurenaturals.com/okay-hemp-seed-shea-softening-anti-breakage-shampoo-helps-stimulate-hair-growth-moisturize-hair-scalp-prevents-breakage-sulfate-silicone-paraben-free-for-all-hair-types-and-textures-made-in-usa-12oz-355ml/" }}
          style={{ width: 200, height: 200 }} PlaceholderContent={<ActivityIndicator />} />
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