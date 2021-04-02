import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon, Header, Badge } from 'react-native-elements';

class AppHeader extends React.Component
{
  constructor (props)
  {
    super( props );
    this.state = {
      value:''
    }
  }
  getNumberOfUnreadNotifications = () =>
{
    db.collection( "all_notifications" ).where( 'notification_status', "==", "unread" )
        .onSnapshot( (snapshot) =>
        {
            var unreadNotifications = snapshot.docs.map( (doc) =>
            {
                doc.data()
            }
            )
            this.setState( {
                value: unreadNotifications.length
            })
    })
}
  BellIconWithBadge = () =>
{
return (
    <View>
        <Icon name='bell' type='font-awesome' color='aqua' size={25} onPress={
() =>
{
    this.props.navigation.navigate('Notifications')
}
} />
        <Badge
            value={this.state.value}
            containerStyle={{position:'absolute', top:-4, right:-4}}
        />
    </View>
)
  }
  componentDidMount ()
  {
    this.getNumberOfUnreadNotifications();
  }
  render() {
    return (
      <View style={styles.textContainer}>
        <Header
          leftComponent={<Icon name='bars' type='font-awesome' color='aqua' onPress={
    () =>
    {
      this.props.navigation.toggleDrawer();
    }
}/>}
centerComponent={{ text: "Barter App", style: { color: "red", fontSize: 20, fontWeight: 'bold' } }}
rightComponent={<this.BellIconWithBadge {...this.props} />}
backgroundColor="blue"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'orange',
  },
  text: {
    color: 'white',
    padding: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AppHeader;
