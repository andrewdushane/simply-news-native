import React from 'react';
import axios from 'axios';
import xml from 'react-native-xml2js';
import { sortBy, flowRight } from 'lodash';
import feedData from '../data/feed';
import parseFeed from '../utils/parseFeed';

const feedById = feedData.reduce(
  (acc, source) => ({
    ...acc,
    [source.id]: source,
  }),
  {},
);
const getSourceData = id => feedById[id];

const updateFeed = (feed, source, raw, initialSourceState = {}) => ({
  ...feed,
  [source.id]: {
    ...initialSourceState,
    ...(feed[source.id] || {}),
    ...source,
    data: raw ? parseFeed(raw) : (feed[source.id] || {}).data || [],
    loading: !raw,
  },
});

const expandContract = feed =>
  feed.map(({ expanded, data, ...rest }) => ({
    ...rest,
    expanded,
    expandable: data.length > 3,
    data: expanded ? data : data.slice(0, 3),
  }));

const sortByName = feed => sortBy(feed, ['name']);

const removeEmptySources = feed =>
  feed.filter(({ data }) => data && data.length > 0);

const feedToSections = flowRight(
  expandContract,
  sortByName,
  removeEmptySources,
  Object.values,
);

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feed: {}, sections: [] };
    this.updateSource = this.updateSource.bind(this);
    this.updateAllSources = this.updateAllSources.bind(this);
    this.updateById = this.updateById.bind(this);
    this.toggleSource = this.toggleSource.bind(this);
  }

  componentDidMount() {
    this.updateAllSources(true);
  }

  updateSource(source, initialize) {
    const initialSourceState = initialize
      ? {
          key: source.id,
          expanded: false,
          toggle: () => this.toggleSource(source.id),
        }
      : {};
    this.setState(prevState => ({
      feed: updateFeed(prevState.feed, source, false, initialSourceState),
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

  updateAllSources(initialize) {
    feedData.forEach(source => {
      this.updateSource(source, initialize);
    });
  }

  updateById(id) {
    this.updateSource(getSourceData(id));
  }

  toggleSource(id) {
    this.setState(prevState => ({
      feed: {
        ...prevState.feed,
        [id]: {
          ...prevState.feed[id],
          expanded: !prevState.feed[id].expanded,
        },
      },
    }));
  }

  render() {
    const sections = feedToSections(this.state.feed);
    return this.props.children({ sections });
  }
}

export default FeedContainer;
