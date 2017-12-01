import React from 'react';
import axios from 'axios';
import xml from 'react-native-xml2js';
import { sortBy, flowRight } from 'lodash';
import feedData from '../data/feed';
import parseFeed from '../utils/parseFeed';
import Feed from './Feed';

const feedById = feedData.reduce(
  (acc, source) => ({
    ...acc,
    [source.id]: source,
  }),
  {},
);
const getSourceData = id => feedById[id];

const updateFeed = (feed, source, raw) => ({
  ...feed,
  [source.id]: {
    ...(feed[source.id] || {}),
    ...source,
    data: (raw ? parseFeed(raw) : (feed[source.id] || {}).data || []).slice(
      0,
      12,
    ),
    key: source.id,
    loading: !raw,
  },
});

const sortByName = feed => sortBy(feed, ['name']);

const removeEmptySources = feed =>
  feed.filter(({ data }) => data && data.length > 0);

const feedToSections = flowRight(sortByName, removeEmptySources, Object.values);

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feed: {}, sections: [] };
    this.updateSource = this.updateSource.bind(this);
    this.updateAllSources = this.updateAllSources.bind(this);
    this.updateById = this.updateById.bind(this);
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

  updateById(id) {
    this.updateSource(getSourceData(id));
  }

  render() {
    return (
      <Feed
        sections={feedToSections(this.state.feed)}
        colors={this.props.colors}
        openArticleDetail={this.props.openArticleDetail}
        update={this.updateById}
      />
    );
  }
}

export default FeedContainer;
