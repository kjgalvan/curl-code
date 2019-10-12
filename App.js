import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/components/screens/Home';
import BarCodeScanner from './src/components/screens/BarCodeScanner';
import Product from './src/components/screens/Product';


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    BarCodeScanner: {
      screen: BarCodeScanner
    },
    Product: {
      screen: Product
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
