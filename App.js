import React from 'react';
import { View } from 'react-native';
import Header from './components/Header';
import FeedContainer from './components/FeedContainer';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header />
        <FeedContainer />
      </View>
    );
  }
}
