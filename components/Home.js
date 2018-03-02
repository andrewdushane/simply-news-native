import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import FeedContainer from './FeedContainer';
import Feed from './Feed';
import { getThemeColors } from '../utils/styles';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  toggleTheme() {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  }
  render() {
    const colors = getThemeColors(this.state.theme);
    return (
      <FeedContainer>
        {({ sections }) => (
          <View>
            <Header
              theme={this.state.theme}
              toggleTheme={this.toggleTheme}
              colors={colors}
            />
            <Feed
              sections={sections}
              colors={colors}
              openArticleDetail={uri => () =>
                this.props.navigation.navigate('ArticleView', { uri })}
            />
          </View>
        )}
      </FeedContainer>
    );
  }
}
