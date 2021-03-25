import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ExchangeScreen from './screens/ExchangeScreen';
import HomeScreen from './screens/HomeScreen'

export default class App extends React.Component {
  render(){
    return(
      <View style = {styles.container}>
        <AppNavigator/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
} );

const AppNavigator = createAppContainer(SwitchNavigator)

const SwitchNavigator = createSwitchNavigator( {
  ExchangeScreen: { screen: ExchangeScreen },
  HomeScreen:{screen:HomeScreen},
})