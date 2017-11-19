import Expo, { Notifications } from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DeckScreen from './screens/DeckScreen';
import MapScreen from './screens/MapScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';


export default class App extends React.Component {
  componentDidMount() {
   registerForNotifications();
   Notifications.addListener((notification) => {
     const { data: { text }, origin } = notification;
     console.log(notification.data);
     if (origin === 'received') {
       Alert.alert(
         'New Push Notification',
         text,
         [{ text: 'Ok.' }]
       );
     }
   });
 }
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          maps: {screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen },
            })
          }
        }, {
            tabBarPosition: 'bottom',
            swipeEnabled: false,
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            }
        }),
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
      });
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
