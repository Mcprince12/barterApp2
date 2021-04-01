import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import AppHeader from '../AppHeader';

export default class HomeScreen extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allRequests: [],
        }
        this.requestRef=null
    }

    getAllRequests = () =>
    {
        this.requestRef = db.collection( 'exchange_requests' ).where( 'username', '==', this.state, userId )
            .onSnapshot( ( snapshot ) =>
            {
                var allRequests = []
                snapshot.docs.map( ( doc ) =>
                {
                    var request = doc.data()
                    request[ "doc_id" ] = doc.id
                    allRequests.push( request )
                    this.setState( {
                        allRequests:allRequests
                    })
                })
        })
    }
    keyExtractor = ( item, index ) => index.toString();
    renderItem = ( { item, i } ) =>
    {
        <ListItem
            key={i}
            title={item.item_name}
            subtitle={item.description}
            bottomDivider
        />
    }
    componentDidMount ()
    {
        this.getAllRequests();
    }
    render ()
    {
        return (
            <View>
                <AppHeader />
                 <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allRequests}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}