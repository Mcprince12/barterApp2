import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../AppHeader';

export default class ExchangeScreen extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            itemName: '',
            description: '',
            username: '',
            requestedId: '',
            isItemRequestActive: '',
            requestedItemName: '',
            itemStatus: '',
            exchangeId: '',
            userDocId: '',
            docId: '',
            userId: firebase.auth().currentUser.email,
        }
    }

    getIsExchangeRequestActive = () =>
    {
        db.collection( 'users' )
            .where( 'username', '==', this.state.userId )
            .onSnapshot( ( querySnapshot ) =>
            {
                querySnapshot.forEach( doc =>
                {
                    this.setState( {
                        isItemRequestActive: doc.data().isItemRequestActive
                    } )
                } )
            } )
    }

    getExchangeRequest = () =>
    {
        var exchangeRequest = db.collection( 'exchange_requests' )
            .where( 'username', '==', this.state.userId )
            .get()
            .then( ( snapshot ) =>
            {
                if ( doc.data().item_status !== "recieved" )
                {
                    this.setState( {
                        exchangId: doc.data().item_itemName,
                        itemStatus: doc.data().item_status,
                        docId: doc.id
                    } )
                }
            } )
    }
    createUniqueId ()
    {
        return Math.random().toString( 36 ).substring( 7 )
    }

    addItem = ( itemName, description ) =>
    {
        var username = this.state.username
        var requestedId = this.createUniqueId();
        db.collection( "exchange_requests" ).add( {
            "username": username,
            "item_name": itemName,
            "description": description,
            "requestedId": requestedId,
        } )
        this.setState( {
            itemName: '',
            description: '',
            requestedId: '',
        } )
        
        return alert(
            'Item ready to exchange',
            '',
            [
                {
                    text: 'OK', onPress: () =>
                    {
                        this.props.navigation.navigate( 'HomeScreen' )
                    }
                }
            ]
        )
    }
    componentDidMount ()
    {
        this.getExchangeRequest();
        this.getIsExchangeRequestActive();
    }
    render ()
    {
        
            if (this.state.isItemRequestActive===true)
        {
                return (
                    <View style={{flex:1, justifyContent:'center'}}>
                        <View style={{borderColor:'orange', borderWidth:2, justifyContent:'center', alignItems:'center', padding:10, margin:10}}>
                            <Text>
                                Item Name     
                            </Text>
                            <Text>
                                {this.state.requestedItemName}
                            </Text>
                        </View>
                        <View style={{borderColor:'orange', borderWidth:2, justifyContent:'center', alignItems:'center', padding:10, margin:10}}>
                            <Text>
                                Item Status
                            </Text>
                            <Text>
                                {this.state.itemStatus}
                            </Text>
                        </View>
                        <TouchableOpacity style={{ borderWidth: 1, borderColor: 'orange', width: 300, alignSelf: 'center', alignItems: 'center', height: 30, margin: 30 }}
                            onPress={
                                () =>
                                {
                                    this.sendNotification();
                                    this.updateExchangeRequestStatus();
                                    this.recievedItem(this.state.requestedItemName)
                                }
                            }
                        >
                            <Text>
                                I recieved the item
                            </Text>
                        </TouchableOpacity>
                </View>
            )    
            } else
            {
                return (
                    <View style={{flex:1}}>
                        <AppHeader navigation={this.props.navigation} />
                        <KeyboardAvoidingView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <TextInput
                                style={styles.formTextInput}
                                placeholder="item name"
                                maxLength={8}
                                onChangeText={(text) =>
                                {
                                    this.setState( {
                                        itemName:text
                                    })
                                }}
                                value={this.state.itemName}
                            />
                            <TextInput
                                multiline={true}
                                numberOfLines={4}
                                style={[ styles.formTextInput, { width: 300 } ]}
                                placeholder="item description"
                                onChangeText={(text) =>
                                {
                                    this.setState( {
                                        description: text,
                                    })
                                }}
                                value={this.state.description}
                            />
                        </KeyboardAvoidingView>
                    </View>
                )
            }
        
    }
}
const styles = StyleSheet.create( {
  Box: {
  width: "80%",
  height: 50,
  borderWidth: 1.5,
  borderColor: "#ffffff",
  fontSize:20,
  paddingLeft:0
    },
    button: {
    backgroundColor: '#90ee90',
    borderRadius: 20,
    width: 200,
    height: 80,
        marginTop: 15,
    alignItems:'center'
    },
    formTextInput: {
  width: "75%",
  height: RFValue(35),
  borderWidth: 1,
  padding: 10,
},
})