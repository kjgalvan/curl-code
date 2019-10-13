import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner as Scanner } from 'expo-barcode-scanner';

export default class BarCodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <Scanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate('Product', { barCodeType: type, productBarCode: data });
  };
}