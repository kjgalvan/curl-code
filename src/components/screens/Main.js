import React from 'react'
import { View, StyleSheet, Text, Dimensions, Image, ScrollView } from 'react-native';
import { Input, Button, SearchBar } from 'react-native-elements';


export default class Main extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={search}
                    />

                    <Text style={styles.container2}>Recommended Products for you</Text>
                    <Text style={styles.container2}>Leave-in</Text>
                    <View style={styles.container3}>
                        <Image source={require("./images/1.png")} style={styles.image}></Image>
                        <Text style={styles.container2}>OKAY Black Jamaican Castor Oil</Text>
                    </View>

                    <Text style={styles.container2}>Conditioner</Text>
                    <View style={styles.container3}>
                        <Image source={require("./images/2.jpeg")} style={styles.image}></Image>
                        <Text style={styles.container2}>Aunt Jackie's Oh So Clean Moisturizing and Softening Shampoo</Text>
                    </View>

                    <Text style={styles.container2}>Gel</Text>
                    <View style={styles.container3}>
                        <Image source={require("./images/3.jpg")} style={styles.image}></Image>
                        <Text style={styles.container2}>Shea Moisture Mongongo & Hemp Seed Oils High Porosity Moisture-seal Styling Gel</Text>
                    </View>

                    <Text style={styles.container2}>Shampoo</Text>
                    <View style={styles.container3}>
                        <Image source={require("./images/4.jpg")} style={styles.image}></Image>
                        <Text style={styles.container2}>OKAY HEMP SEED & SHEA SOFTENING & ANTI BREAKAGE SHAMPOO</Text>
                    </View>

                </View>
            </ScrollView>
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
    },
    view1: {
        width: Dimensions.get("window").width,
        height: 50,
        backgroundColor: "purple",
    },
    container2: {
        fontSize: 15,
        lineHeight: 30,
        color: "purple"
    },
    container3: {
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "pink",
        padding: 20,
        width: 300,
        height: 250,
        marginTop: 20,
    },
    image: {
        width: 120,
        height: 120
    }
});