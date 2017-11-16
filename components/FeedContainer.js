import React from 'react';
import axios from 'axios';
import xml from 'react-native-xml2js';
import { sortBy } from 'lodash';
import feedData from '../data/feed';
import parseFeed from '../utils/parseFeed';
import Feed from './Feed';

const updateFeed = (feed, source, raw) => ({
  ...feed,
  [source.id]: {
    ...(feed[source.id] || {}),
    ...source,
    data: raw ? parseFeed(raw) : (feed[source.id] || {}).data || [],
    key: source.id,
    loading: !raw,
  },
});

const feedToSections = feed => sortBy(Object.values(feed), ['name']);

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feed: {}, sections: [] };
    this.updateSource = this.updateSource.bind(this);
    this.updateAllSources = this.updateAllSources.bind(this);
  }

  componentDidMount() {
    this.updateAllSources();
  }

  updateSource(source) {
    this.setState(prevState => ({
      feed: updateFeed(prevState.feed, source),
    }));
    axios
      .get(source.rss_url)
      .then(({ data }) => {
        xml.parseString(data, (err, parsed) => {
          if (err) {
            return;
          }
          this.setState(prevState => ({
            feed: updateFeed(prevState.feed, source, parsed),
          }));
        });
      })
      .catch(e => {
        return;
      });
  }

  updateAllSources() {
    feedData.forEach(source => {
      this.updateSource(source);
    });
  }

  render() {
    return (
      <Feed
        sections={feedToSections(this.state.feed)}
        colors={this.props.colors}
        openArticleDetail={this.props.openArticleDetail}
        updateAllSources={this.updateAllSources}
      />
    );
  }
}

export default FeedContainer;
