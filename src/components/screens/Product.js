import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, ActivityIndicator } from 'react-native-elements';
import firebase from 'firebase';
import '@firebase/firestore';

export default class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredientList: null,
      rules: [],
      recommend: [],
      approve: [],
      warn: [],
      avoid: []
    }
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    const db = firebase.firestore();
    var barcode = navigation.getParam('productBarCode', '')
    // var barcode = "034285699161";

    if (barcode.length === 12) {
      barcode = "0" + barcode;
    }

    db.collection("products").where("barcode", "==", barcode)
      .get()
      .then((querySnapshot) => {
        this.setState({ ingredientList: querySnapshot.docs[0].data().ingredientList });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    db.collection("rulesets").doc("default")
      .get()
      .then((ruleset) => {
        const ruleSetRules = ruleset.data().rules
        const ruleSetLength = ruleSetRules.length;
        ruleSetRules.map((ruleId, i) => {
          db.collection("rules").doc(ruleId)
            .get()
            .then((rule) => {
              const newRules = this.state.rules.concat(rule.data());
              this.setState({ rules: newRules })

              if (ruleSetLength === i + 1) {
                this.analyze(this.state.ingredientList, newRules);
              }
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        })
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  analyze = (ingredientList, rules) => {
    const ingredientArray = ingredientList.toLowerCase().split(/,|\//).map((i) => i.trim());
    for (rule of rules) {
      const { category, filter, input, reason, operator } = rule[0];
      const inputArray = rule[0].input.toLowerCase().split(/,|\//).map((i) => i.trim());

      var match = [];
      switch (filter) {
        case "is":
          match = ingredientArray.filter((ingredient) => inputArray.includes(ingredient));
          break;
        case "contains":
          match = ingredientArray.filter((ingredient) => {
            for (input of inputArray) {
              if (ingredient.includes(input)) {
                return true;
              }
            }
            return false;
          });
          break;
        default:
          console.log("error");
      }
      if (match.length > 0) {
        const updateResult = this.state[category].concat({
          ingredients: match,
          reason
        });
        this.setState({ [category]: updateResult })
      }
    }
  }

  render() {
    const { recommend, approve, warn, avoid } = this.state;
    console.log(recommend, approve, warn, avoid);
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