import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from './screens/ExchangeScreen';
import HomeScreen from './screens/HomeScreen'

export default class App extends React.Component {
  render(){
    return(
      <View style = {styles.container}>
        <SignupLoginScreen/>
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


const TabNavigator = createBottomTabNavigator( {
  ExchangeScreen: { screen: ExchangeScreen },
  HomeScreen:{screen:HomeScreen},
} )

const AppNavigator = createAppContainer(TabNavigator)