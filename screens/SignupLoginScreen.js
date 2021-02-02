import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AppHeader from '../AppHeader'
import firebase from 'firebase';
import db from '../config'

export default class SignupLoginScreen extends React.Component{
    
    constructor(){
        super();
        this.state={
            username:'',
            password:'',
        }
    }

    userLogin = (username, password) =>{
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(()=>{
            return alert("Successfully Login")
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert(errorMessage)
        })
    }

    userSignUp = (username, password) =>{
        firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(()=>{
            return alert("User Added Successfully")
        })
        .catch(function(error){
            var errorCode = error.code
            var errorMessage = error.message
            return alert(errorMessage)
        })
    }
    
    render(){
        return(
            <View>
                <AppHeader/>
                <View style={{alignItems:'center',}}>
                    <Image source={require('../assets/barterr.png')}
                    style={{width:200, height:200}}
                    />
                </View>
                <View style = {{alignItems:'center'}}>
                <TextInput
                style = {styles.loginBox}
                placeholder="Email"
                keyboardType = 'email-address'
                onChangeText={(text)=>{
                   this.setState({
                       username:text
                   }) 
                }}/>
                <TextInput
                placeholder="Password"
                style = {styles.loginBox}
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}/>
                </View>

                <View style={{alignItems:'center'}}>
                <TouchableOpacity
                style = {[styles.button, {marginBottom:10}]}
                onPress={
                    ()=>{
                        this.userLogin(this.state.username, this.state.password)
                    }
                }
                >
                    <Text style = {{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>
                        Log In
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.button}
                onPress={()=>{this.userSignUp(this.state.username, this.state.password)}}>
                    <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>
                       Sign Up
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button:{ width:300, height:50, justifyContent:'center', alignItems:'center', borderRadius:25, backgroundColor:"#ff9800", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.30, shadowRadius: 10.32, elevation: 16, },
    loginBox:{ width: 300, height: 40, borderBottomWidth: 1.5, borderColor : '#ff8a65', fontSize: 20, margin:10, paddingLeft:10 }, 
})