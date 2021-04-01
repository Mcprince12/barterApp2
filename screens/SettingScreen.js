import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AppHeader from '../AppHeader';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';

export default class SettingScreen extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            emailId: '',
            docId:'', 
        }
    } 
getUserDetails = () =>
 {
     var email = firebase.auth().currentUser.email;
     db.collection( "users" ).where( 'email_id', '==', email ).get()
         .then( (snapshot) =>
         {
             snapshot.forEach( (doc) =>
             {
                 var data = doc.data()
                 this.setState( {
                     emailId: data.email_id,
                     firstName: data.first_name,
                     lastName: data.last_name,
                     contact: data.contact,
                     address: data.address, 
                     docId:doc.id,
                 })
         })
     })
 }
    updateUserDetails=()=>
    {
        db.collection("users").doc(this.state.docId).update( {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "contact": this.state.contact,
            "address":this.state.address
        } )
        alert("Profile Updated Successfully")
    }


    componentDidMount ()
    {
        this.getUserDetails()
    }
    render ()
    {
        return (
            <View style={styles.container}>
                <AppHeader/>
                <View style={styles.fontContainer}>
                    <Text style={styles.label}>
                        First Name
                    </Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"First Name"}
                        maxLength={8}
                        onChangeText={
                            (text) =>
                            {
                                this.setState( {
                                    firstName:text,
                                })
                            }
                        }
                         
                    />
                    
                        <Text style={styles.label}>
                        Last Name
                        </Text>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Last Name"}
                            maxLength={8}
                            onChangeText={
                            (text) =>
                                {
                                this.setState( {
                                    lastName:text,
                                    })
                                }
                            }

                        />
                    
                    <Text style={styles.label}>
                        Contact
                    </Text>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Contact"}
                        maxLength={10}
                        keyboardType={"numeric"}
                        onChangeText={(text)=>{
                            this.setState({
                                contact:text,
                            })
                        }}
                    />
                    
                        <Text style={styles.label}>
                        Address
                        </Text>
                        <TextInput
                        style={styles.formTextInput}
                        placeholder={"Address"}
                        multiline={true}
                        onChangeText={(text)=>{
                            this.setState({
                                address:text,
                            })
                        }}
                        
                        
                    />

                    <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={
                            () =>
                            {
                                this.updateUserDetails()
                            }
                        }
                    >
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                        </TouchableOpacity>
                        </View>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create( {
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    formContainer: { flex: 1, width: '100%', alignItems: 'center' },
    formTextInput: { width: "75%", height: RFValue( 50 ), alignSelf: 'center', marginBottom: RFValue( 20 ), marginLeft: RFValue( 20 ), borderColor: '#ffab91', borderRadius: 10, borderWidth: 1, marginTop: RFValue( 20 ), padding: RFValue( 10 ), },
    button: { width: "75%", height: RFValue( 60 ), justifyContent: 'center', alignItems: 'center', borderRadius: RFValue( 50 ), backgroundColor: "#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop: 20 },
    buttonText: { fontSize: RFValue( 23 ), fontWeight: "bold", color: "#fff" },
    buttonView: { flex: 0.22, alignItems: 'center', marginTop: RFValue( 100 ) },
    label: { fontSize: RFValue( 18 ), color: "teal", fontWeight: "bold", padding: RFValue( 10 ), marginLeft: RFValue( 20 ) },
} )