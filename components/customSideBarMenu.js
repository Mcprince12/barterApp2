import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import { Avatar, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker'

export default class customSideBarMenu extends React.Component
{
    constructor ()
    {
        super();
        this.state = {
            name: '',
            docId:'',
            userId: firebase.auth().currentUser.email,
            image:'#'
        }
    }
    getUserProfile = () =>
{
  db.collection( 'users' ).where( "email_id", "==", this.state.userId )
    .onSnapshot( (querySnapshot) =>
    {
      querySnapshot.forEach( (doc) =>
      {
        this.setState( {
          name: doc.data().first_name+" "+doc.data().last_name,
          docId: doc.id,
          image: doc.data().image,
      })
    })
  })
}
    selectPicture = async () =>
    {
        const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing=true,
            aspect: [ 4, 3 ],
            quality:1
        } )
        if (!cancelled)
        {
            this.uploadImage( uri, this.state.userId );
        }
    }

    uploadImage = async ( uri, imageName ) =>
    {
        var response = await fetch( uri );
        var blob = await response.blob();
        var ref = firebase
            .storage()
            .ref()
            .child( "user_profiles/" + imageName );
    }

    fetchImage = () =>
    {
        var storageRef = firebase
            .storage()
            .ref()
            .child( "user_profiles/" + imageName )
        storageRef
            .getDownloadURL()
            .then( ( url ) =>
            {
                this.setState( {
                    image: url
                } )
                    .catch( ( error ) =>
                    {
                        this.setState( {
                        image:'#'
                    })
                })
        })
    }
    componentDidMount ()
    {
        this.fetchImage( this.state.userId );
        this.getUserProfile();
    }
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