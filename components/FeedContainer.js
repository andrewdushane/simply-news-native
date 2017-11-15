import React from 'react';
import axios from 'axios';
import xml from 'react-native-xml2js';
import { sortBy } from 'lodash';
import feedData from '../data/feed';
import parseFeed from '../utils/parseFeed';
import Feed from './Feed';

const updateFeed = (feed, source, raw) =>
  sortBy(
    [
      ...feed,
      {
        ...source,
        articles: parseFeed(raw),
      },
    ],
    ['name'],
  );

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
              const feed = updateFeed(prevState.feed, source, parsed);
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
    return (
      <Feed
        sections={this.state.sections}
        colors={this.props.colors}
        openArticleDetail={this.props.openArticleDetail}
      />
    );
  }
}

export default FeedContainer;
