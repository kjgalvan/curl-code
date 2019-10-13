import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native';
import {
  SearchBar,
  Icon,
  Text
} from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    }
  }

  onCancel = () => this.setState({ searchText: '' });

  onClear = () => this.setState({ searchText: '' });

  onChangeText = text => this.setState({ searchText: text });

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerContainer}>
          <Icon iconStyle={styles.headingIcon} color="white" name="search" size={62} />
          <Text style={styles.heading}>Search Products</Text>
        </View>
        <SearchBar
          placeholder="Search for products coming soon!"
          value={this.state.searchText}
          platform={Platform.OS === 'ios' ? "ios" : "android"}
          onCancel={this.onCancel}
          onClear={this.onClear}
          onChangeText={this.onChangeText}
        />
        <View style={{ marginTop: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'regular', alignSelf: 'center', textAlign: 'center' }} h3>Test the Bar Code Scanning!</Text>
          <Icon iconStyle={styles.headingIcon} onPress={() => this.props.navigation.navigate('BarCodeScanner')} reverse color="#e8938e" name="barcode-scan" type="material-community" size={70} />
        </View>
        <View style={{ marginTop: 50, marginBottom: 50, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'regular', alignSelf: 'center', textAlign: 'center' }} h3>Test Google Vision API!</Text>
          <Icon iconStyle={styles.headingIcon} onPress={() => this.props.navigation.navigate('Camera')} reverse color="#e8938e" name="camera" type="material-community" size={70} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#e8938e',
  },
  headingIcon: {
    marginTop: 10,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangleLeft: {
    position: 'absolute',
    left: -20,
    bottom: 0,
    width: 0,
    height: 0,
    borderRightWidth: 20,
    borderRightColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  triangleRight: {
    position: 'absolute',
    right: -20,
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderLeftColor: 'white',
    borderBottomWidth: 25,
    borderBottomColor: 'transparent',
    borderTopWidth: 25,
    borderTopColor: 'transparent',
  },
  inputContainerStyle: {
    marginTop: 16,
    width: '90%',
  },
});