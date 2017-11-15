import React from 'react';
import { ListView } from 'react-native';
import axios from 'axios';
import xml from 'react-native-xml2js';
import selectN from 'selectn';
import feedData from '../data/feed';
import parseFeed from '../utils/parseFeed';
import Feed from './Feed';

const getSectionIds = feed => Object.keys(feed);
const getRowIds = feed =>
  Object.values(feed).map(({ articles }) => articles.map((ar, i) => i));

class FeedContainer extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      getSectionData: (dataBlob, sectionId) => dataBlob[sectionId],
      getRowData: (dataBlob, sectionId, rowId) =>
        selectN(`${sectionId}.articles.${rowId}`, dataBlob),
    });
    this.state = {
      feed: {},
      dataSource: ds.cloneWithRowsAndSections({}),
    };
  }

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
              const feed = {
                ...prevState.feed,
                [source.id]: {
                  ...source,
                  articles: parseFeed(parsed),
                },
              };
              return {
                feed,
                dataSource: prevState.dataSource.cloneWithRowsAndSections(
                  feed,
                  getSectionIds(feed),
                  getRowIds(feed),
                ),
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
      <Feed dataSource={this.state.dataSource} colors={this.props.colors} />
    );
  }
}

export default FeedContainer;
