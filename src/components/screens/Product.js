import React from "react";
import { StyleSheet, View } from "react-native";
import { Image, Header } from "react-native-elements";
import firebase from "firebase";
import "@firebase/firestore";

export default class Product extends React.Component {
  render() {
    const { navigation } = this.props;

    const db = firebase.firestore();
    const barcode = navigation.getParam("productBarCode", "");

    console.log("hi2");

    if (barcode) {
      db.collection("products")
        .where("barcode", "==", barcode)
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
    }

    return (
      <View>
        <Image style={{ width: 150, height: 150 }} />
        <Header
          centerComponent={{ text: "Title", style: { color: "#f08080" } }}
          rightComponent={{ icon: "search", color: "#f08080" }}
        />
        <Header
          centerComponent={{ text: "Description", style: { color: "#f08080" } }}
          leftComponent={{ color: "#f08080" }}
        />
        {/*<ion-icon name="arrow-dropdown"></ion-icon>*/}

        <Header
          centerComponent={{ text: "Ingredients", style: { color: "#f08080" } }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff0f5",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonTop: {
    margin: 10
  }
});
