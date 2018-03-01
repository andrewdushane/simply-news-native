import React from 'react';
import { WebView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import selectN from 'selectn';
import Home from './Home';
import { getThemeColors } from '../utils/styles';

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
        headerTintColor: getThemeColors().mainColor,
      },
    },
  },
  { headerMode: 'screen' },
);

export default Navigator;
