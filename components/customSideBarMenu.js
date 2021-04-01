import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';

export default class customSideBarMenu extends React.Component
{
    render ()
    {
        return (
            <View style={{flex:1}}>
            <DrawerItems {...this.props} />
            <View style={{flex:1, justifyContent:'flex-end', paddingBottom:30}}>
                    <TouchableOpacity style={{ justifyContent: 'center', padding: 10, height: 30, width: '100%' }}
                        onPress={() =>
                        {
                            this.props.navigation.navigate( 'SignUpLoginScreen' )
                            firebase.auth().signOut();
                        }}
                    >
                        <Text>Log out</Text>
                    </TouchableOpacity>
                </View>
                </View>
        )
    }
}