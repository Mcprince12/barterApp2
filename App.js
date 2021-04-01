import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLoginScreen from './screens/SignupLoginScreen'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from './screens/ExchangeScreen';
import HomeScreen from './screens/HomeScreen';
import AppDrawerNavigator from './components/AppDrawerNavigator';

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

const SwitchNavigator = createSwitchNavigator( {
  SignUpLoginScreen: { screen: SignupLoginScreen },
  TabNavigator: { screen: TabNavigator },
  Drawer:{screen:AppDrawerNavigator},
})

const TabNavigator = createBottomTabNavigator( {
  ExchangeScreen: { screen: ExchangeScreen },
  HomeScreen: { screen: HomeScreen },
} )

const AppNavigator = createAppContainer(SwitchNavigator)