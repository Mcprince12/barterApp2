import React from 'react';
import { StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import db from '../config'
import firebase from 'firebase'

export default class ExchangeScreen extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            itemName: '',
            description: '',
            username: '',
        }
    }
    addItem = (itemName, description) =>
    {
        var username = this.state.username
        db.collection( "exchange_requests" ).add( {
            "username": username,
            "item_name": itemName,
            "description":description,
        } )
        this.setState( {
            itemName: '',
            description: '',
        } )
        
        return alert(
            'Item ready to exchange',
            '',
            [
                {
                    text: 'OK', onPress: () =>
                    {
                    this.props.navigation.navigate('HomeScreen')
                }}
            ]
        )
    }
    render ()
    {
        return (
            <View>
                <Modal>
                    <TextInput
                        style={styles.Box}
                        placeholder="item name"
                        onChangeText={( text ) =>
                        {
                            this.setState( {
                                itemName:text,
                            })
                        }}
                    />
                    <TextInput
                        style={styles.Box}
                        placeholder="item description"
                        onChangeText={( text ) =>
                        {
                            this.setState( {
                                description:text,
                            })
                        }}
                    />
                </Modal>
                <TouchableOpacity
                    style={[ styles.button, { marginTop: 10 } ]}
                    onPress={
                        () =>
                        {
                            this.addItem(this.state.itemName, this.state.description)
                        }
                    }
                >
                    <Text
                        style={{color:'#ffff', fontSize:18, fontWeight:'bold'}}
                    >
                        Add Item
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create( {
  Box: {
  width: "80%",
  height: RFValue(50),
  borderWidth: 1.5,
  borderColor: "#ffffff",
  fontSize: RFValue(20),
  paddingLeft: RFValue(10)
    },
    button: {
    backgroundColor: '#90ee90',
    borderRadius: 20,
    width: 200,
    height: 80,
    marginTop: 15,
    marginLeft:700,
},
})