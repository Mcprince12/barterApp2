import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import AppHeader from '../AppHeader';
import SwipeableFlatList from '../components/SwipeableFlatList';

export default class NotificationScreen extends React.Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications:[],
        }
        this.notificationRef=null
    }
    addNotifications = () =>
    {
        this.notificationRef = db.collection( 'all_notifications' )
            .where( 'notification_status', '==', 'unread' )
            .where( 'targeted_user_id', '==', this.state.userId )
            .onSnapshot( ( snapshot ) =>
            {
                var allNotifications = []
                snapshot.docs.map( doc =>
                {
                    var notification = doc.data()
                    notification[ "doc_id" ] = doc.id
                    allNotifications.push( notification )
                } )
                this.setState( {
                    allNotifications:allNotifications,
                })
        })
    }

    componentDidMount ()
    {
        this.addNotifications();
    }

    componentWillUnmount ()
    {
        this.notificationRef();
    }

    keyExtractor = ( item, index ) => index.toString();
    renderItem = ( { item, index } ) =>
    {
        <ListItem
            key={index}
            title={item.itemName}
            subtitle={item.message}
            bottomDivider
        />
    }
    render ()
    {
        return (
            <View style={{flex:0.9}}>
                <AppHeader />
                <View style={{ flex: 0.9 }}>
                    {
                        this.state.allNotifications.length === 0
                            ? (
                                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                    <Text style={{fontSize:25}}>
                                        You have No new Notifications
                                    </Text>
                                    </View>
                            ) :
                            (
                                <SwipeableFlatList
                                    allNotifications={this.state.allNotifications}
                                />
                            )
                    }
                </View>
            </View>
        )
    }
}