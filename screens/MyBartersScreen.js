import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../AppHeader';

export default class MyBartersScreen extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            allBarters: [],
            userName: "",
        }
    }
    
    getAllBarters = () =>
    {
        this.ref = db.collection( 'MyBarters' ).where( 'username', '==', this.state.userId )
            .onSnapshot( ( snapshot ) =>
            {
                var allBarters = []
                snapshot.docs.map( ( doc ) =>
                {
                    var barter = doc.data()
                    barter[ "doc_id" ] = doc.id
                    allBarters.push(barter)
                } )
                this.setState( {
                    allBarters:allBarters
                })
        })
    }
    keyExtractor = ( item, index ) => index.toString();
    renderItem = ( { item, i } ) =>
    {
        <ListItem
            key={i}
            title={item.name}
            subitle={item.exchangeStatus}
            bottomDivider
        />
    }
    render ()
    {
        return (
            <View>
                <AppHeader />
                <Text style={{fontSize:20}}>
                    List of all Barters
                </Text>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.allBarters}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}