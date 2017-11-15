import React from 'react';
import { ListView } from 'react-native';
import { List } from 'react-native-elements';
import Article from './Article';
import SourceHeader from './SourceHeader';

const Feed = ({ dataSource, colors }) => (
  <List containerStyle={{ marginTop: 0 }}>
    <ListView
      dataSource={dataSource}
      renderRow={rowData => <Article {...rowData} {...colors} />}
      renderSectionHeader={sectionData => <SourceHeader {...sectionData} />}
    />
  </List>
);

export default Feed;
