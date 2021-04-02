import { createStackNavigator } from 'react-navigation-stack';
import customSideBarMenu from '../components/customSideBarMenu';
import AppDrawerNavigator from '../components/AppDrawerNavigator';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import MyBartersScreen from '../screens/MyBartersScreen';
import NotificationScreen from '../screens/NotificationScreen';

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
        Notifications: {
            screen:NotificationScreen
        }
    },
        {
            initialRouteName:'UserDetails'
})
