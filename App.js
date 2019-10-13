import {
  StyleSheet
} from 'react-native';
import {
  createAppContainer
} from 'react-navigation';
import {
  createStackNavigator
} from 'react-navigation-stack';
import firebase from 'firebase';
import '@firebase/firestore';

import BarCodeScan from './src/components/screens/BarCodeScan';
import BarCodeScanner from './src/components/screens/BarCodeScanner';
import Home from './src/components/screens/Home';
import Login from './src/components/screens/Login';
import Product from './src/components/screens/Product';
import Signup from './src/components/screens/Signup';
import InMainPage from './src/components/screens/InMainPage';
import firebaseConfig from './firebaseConfig';


import {
  Platform,
  InteractionManager
} from 'react-native';

firebase.initializeApp(firebaseConfig);

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
  // Work around issue `Setting a timer for long time`
  // see: https://github.com/firebase/firebase-js-sdk/issues/97
  const timerFix = {};
  const runTask = (id, fn, ttl, args) => {
    const waitingTime = ttl - Date.now();
    if (waitingTime <= 1) {
      InteractionManager.runAfterInteractions(() => {
        if (!timerFix[id]) {
          return;
        }
        delete timerFix[id];
        fn(...args);
      });
      return;
    }

    const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
    timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
  };

  global.setTimeout = (fn, time, ...args) => {
    if (MAX_TIMER_DURATION_MS < time) {
      const ttl = Date.now() + time;
      const id = '_lt_' + Object.keys(timerFix).length;
      runTask(id, fn, ttl, args);
      return id;
    }
    return _setTimeout(fn, time, ...args);
  };

  global.clearTimeout = id => {
    if (typeof id === 'string' && id.startsWith('_lt_')) {
      _clearTimeout(timerFix[id]);
      delete timerFix[id];
      return;
    }
    _clearTimeout(id);
  };
}

const AppNavigator = createStackNavigator({
  BarCodeScanner: {
    screen: BarCodeScanner
  },
  BarCodeScan: {
    screen: BarCodeScan
  },
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  Product: {
    screen: Product
  },
  Signup: {
    screen: Signup
  },
  InMainPage: {
    screen: InMainPage 
  }
}, {
  initialRouteName: 'InMainPage',
});

export default createAppContainer(AppNavigator);