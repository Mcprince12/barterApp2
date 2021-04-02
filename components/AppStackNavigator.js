import { createStackNavigator } from 'react-navigation-stack';
import customSideBarMenu from '../components/customSideBarMenu';
import AppDrawerNavigator from '../components/AppDrawerNavigator';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import MyBartersScreen from '../screens/MyBartersScreen';

export const AppStackNavigator = createStackNavigator( {
  
    AppDrawerNavigator
},
    {
        UserDetails: {
            screen: UserDetailsScreen
        },
    },
    {
        MyBarters: {
            screen:MyBartersScreen
        }
    },
        {
            initialRouteName:'UserDetails'
})
