import React from 'react';
import axios from 'axios';
import xml from 'react-native-xml2js';
import { sortBy, flowRight } from 'lodash';
import feedData from '../data/feed';
import parseFeed from '../utils/parseFeed';

const sourceIds = feedData.map(({ id }) => id);

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

const doneLoading = sourceId => prevState => ({
  loadingSources: prevState.loadingSources.filter(id => id !== sourceId),
});

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { feed: {}, loadingSources: [] };
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
            this.setState(doneLoading(source.id));
            return;
          }
          this.setState(prevState => ({
            feed: updateFeed(prevState.feed, source, parsed),
            loadingSources: prevState.loadingSources.filter(
              id => id !== source.id,
            ),
          }));
        });
      })
      .catch(e => {
        this.setState(doneLoading(source.id));
        return;
      });
  }

  updateAllSources(initialize) {
    this.setState({
      loadingSources: sourceIds,
    });
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
    return this.props.children({
      sections: feedToSections(this.state.feed),
      refresh: this.updateAllSources,
      loading: this.state.loadingSources.length > 0,
    });
  }
}

export default FeedContainer;
