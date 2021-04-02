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
    sendNotification = (bookDetails, requestStatus) =>
{
    var requestId = ItemDetails.request_id
    var donorId = ItemDetails.donor_id
    db.collection( "all_notifications" ).where( "request_id", "==", requestId )
        .where( "donor_id", "==", donorId ).get().then( (snapshot) =>
        {
            snapshot.forEach( (doc) =>
            {
                var message = ""
                if (requestStatus==="Item Sent")
                {
                    message=this.state.donorName+"Sent You Item"
                } else
                {
                    message=this.state.donorName+"Has Shown Interest In Exchanging The Item"
                }
                db.collection( "all_notifications" ).doc( doc.id ).update( {
                    "message": message,
                    "notification_status": "unread",
                    "date":firebase.firestore.FieldValue.serverTimestamp()
                })
        })
    })
    
    }
     sendItem = ( ItemDetails ) =>
 {
     if (ItemDetails.request_status==="Item Sent")
     {
         var requestStatus = "Barterer Interested"
         db.collection( "exchange_requests" ).doc( ItemDetails.doc_id ).update( {
             "request_status":"Barterer Interested"
         } )
         this.sendNotification(ItemDetails, requestStatus)
     } else
     {
         var requestStatus = "Item Sent"
         db.collection( "exchange_requests" ).doc( ItemDetails.doc_id ).update( {
             "request_status":"Item Sent"
         } )
         this.sendNotification(ItemDetails, requestStatus)
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
            rightElement={
                <TouchableOpacity
                    style={[ styles.button,
    {
        backgroundColor:item.request_status==="Item Sent"?"aqua":"green"
    }
]}
onPress={
    () =>
    {
        this.sendItem(item)
    }
}
                >
                    <Text style={{color:'aqua'}}>
                        {item.request_status === "Item Sent" ?"Item Sent":"Send Item"}
                    </Text>
                </TouchableOpacity>
            }
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