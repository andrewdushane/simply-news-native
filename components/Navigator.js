import React from 'react';
import { WebView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import selectN from 'selectn';
import Home from './Home';

const Navigator = StackNavigator(
  {
    Home: {
      screen: Home,
      title: 'Simply News',
      path: '/',
      navigationOptions: {
        header: null,
      },
    },
    ArticleView: {
      screen: ({ navigation }) => (
        <WebView source={{ uri: selectN('state.params.uri', navigation) }} />
      ),
      path: '/article-view',
      navigationOptions: {
        headerTintColor: 'black',
      },
    },
  },
  { headerMode: 'screen' },
);

export default Navigator;
