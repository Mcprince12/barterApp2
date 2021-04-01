import React from 'react';
import { createDrawerNavigator } from 'react-native-drawer';
import SettingScreen from '../screens/SettingScreen';
import customSideBarMenu from '../components/customSideBarMenu';

const AppDrawerNavigator = createDrawerNavigator( {
    Home: {
        screen: TabNavigator
    },
    Settings: {
        screen: SettingScreen
    },

   
        contentComponent:customSideBarMenu
    },
    {
        initialRouteName:'Home'
    
})