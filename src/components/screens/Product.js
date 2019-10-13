import React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Image, Text, Card, ListItem } from "react-native-elements";
import firebase from "firebase";
import "@firebase/firestore";

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: null,
      ingredientList: null,
      analyzed: false,
      rules: [],
      recommend: [],
      approve: [],
      warn: [],
      avoid: []
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;

    const db = firebase.firestore();
    var barcode = navigation.getParam("productBarCode", "");
    // var barcode = "034285699161";

    if (barcode.length === 12) {
      barcode = "0" + barcode;
    }

    db.collection("products")
      .where("barcode", "==", barcode)
      .get()
      .then(querySnapshot => {
        this.setState({
          product: querySnapshot.docs[0].data(),
          ingredientList: querySnapshot.docs[0].data().ingredientList
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

    db.collection("rulesets")
      .doc("default")
      .get()
      .then(ruleset => {
        const ruleSetRules = ruleset.data().rules;
        const ruleSetLength = ruleSetRules.length;
        ruleSetRules.map((ruleId, i) => {
          db.collection("rules")
            .doc(ruleId)
            .get()
            .then(rule => {
              const newRules = this.state.rules.concat(rule.data());
              this.setState({ rules: newRules });

              if (ruleSetLength === i + 1) {
                this.analyze(this.state.ingredientList, newRules);
              }
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  };

  analyze = (ingredientList, rules) => {
    const ingredientArray = ingredientList
      .toLowerCase()
      .split(/,|\//)
      .map(i => i.trim());
    for (rule of rules) {
      const { category, filter, input, reason, operator } = rule[0];
      const inputArray = rule[0].input
        .toLowerCase()
        .split(/,|\//)
        .map(i => i.trim());

      var match = [];
      switch (filter) {
        case "is":
          match = ingredientArray.filter(ingredient =>
            inputArray.includes(ingredient)
          );
          break;
        case "contains":
          match = ingredientArray.filter(ingredient => {
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
        this.setState({ [category]: updateResult });
      }
    }
    this.setState({ analyzed: true })
  };

  getCards = (category, title) => {
    return (
      <View>
        {category.length > 0 && category.map((results) =>
          <Card key={uuidv4()} title={title}>
            <View>
              <Text>{results && results.reason}</Text>
              {
                results.ingredients.map((u, i) => {
                  return (
                    <ListItem
                      key={i}
                      title={u}
                    />
                  );
                })
              }
            </View>
          </Card>)
        }
      </View>
    )
  }

  render() {
    const { recommend, approve, warn, avoid, product, analyzed } = this.state;

    const notFound = "https://firebasestorage.googleapis.com/v0/b/curl-code.appspot.com/o/not-found.png?alt=media&token=d7e0464e-048c-4280-99be-e42ea5259729"
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image containerStyle={{ marginTop: 15, marginBottom: 15, marginLeft: 15 }} source={product && product.imageUrl ? { uri: product.imageUrl } : { uri: notFound }} style={{ width: 150, height: 150 }} />
          <View style={{ width: SCREEN_WIDTH - 180 }}>
            <Text h2 style={{ fontFamily: 'regular', marginLeft: 10, marginTop: 10 }} >{product && product.name}</Text>
          </View>
        </View>
        <View>
          <Text h4 style={{ fontFamily: 'regular', paddingLeft: 10 }} >Description:</Text>
          <Text style={{ paddingLeft: 20, paddingRight: 20, paddingBottom: 10, fontFamily: 'regular' }}>{product && product.description}</Text>
        </View>
        <View>
          {analyzed && warn.length === 0 && avoid.length === 0 &&
            <Text style={{ alignSelf: 'center', textAlign: 'center', color: '#e8938e' }} h3>This product is CG compliant</Text>
          }
          {this.getCards(recommend, 'Recommended For You')}
          {this.getCards(approve, 'CG Approved')}
          {this.getCards(warn, 'Warning')}
          {this.getCards(avoid, 'Not CG')}
        </View>
      </ScrollView>
    );
  }
}
