/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Results from './components/results';
import Game from './components/game';
import { Provider } from 'react-redux';
import configureStore from './state-management/store';

const store = configureStore()
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Game}
            options={{title: 'Welcome'}}
          />
          <Stack.Screen
            name="Results"
            component={Results}
            options={{title: 'Results'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
