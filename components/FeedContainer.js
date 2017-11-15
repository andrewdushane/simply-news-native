import React from 'react';
import axios from 'axios';
import xml from 'react-native-xml2js';
import feedData from '../data/feed';
import parseFeed from '../utils/parseFeed';
import Feed from './Feed';

class FeedContainer extends React.Component {
  state = { feed: [], sections: [] };

  componentDidMount() {
    feedData.forEach(source => {
      axios
        .get(source.rss_url)
        .then(({ data }) => {
          xml.parseString(data, (err, parsed) => {
            if (err) {
              return;
            }
            this.setState(prevState => {
              const feed = [
                ...prevState.feed,
                {
                  ...source,
                  articles: parseFeed(parsed),
                },
              ];
              return {
                feed,
                sections: feed.map(section => ({
                  ...section,
                  data: section.articles,
                  key: section.id,
                })),
              };
            });
          });
        })
        .catch(e => {
          return;
        });
    });
  }
  render() {
    return <Feed sections={this.state.sections} colors={this.props.colors} />;
  }
}

export default FeedContainer;
