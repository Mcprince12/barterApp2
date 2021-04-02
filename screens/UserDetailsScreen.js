import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class UserDetailsScreen extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            userId: firebase.auth().currentUser.email,
            itemName: this.props.getParam('item_name')['username'],
            itemDescription: this.props.getParam('description')['username'],
            requestId: this.props.getParam('requestedId')['username'],
            recieverContact: '',
            recieverAddress: '',
            recieverRequestDocId: '',
            userName: '',
            recieverName:'',
        }
    }

    getUserDetails = () =>
    {
        db.collection( 'users' ).where( 'username', '==', this.state.userId ).get()
            .then( ( snapshot ) =>
            {
                snapshot.forEach( ( doc ) =>
                {
                    this.setState( {
                userName:doc.data().first_name+" "+doc.data().last_name,
            })
            })
        })
    }

    addBarters = () =>
    {
        db.collection( 'MyBarters' ).add( {
            "name": this.state.itemName,
            "exchangerName": this.state.requestId,
            "exchangerContact": this.state.recieverContact,
            "exchangerAddress": this.state.recieverAddress,
            "exchangeId": this.state.recieverRequestDocId,
            "exchangeStatus": "recieved",
        })
    }
       render ()
    {
        return (
            <View>
                <Text>
                    User Details
                </Text>
            </View>
        )
    }
}