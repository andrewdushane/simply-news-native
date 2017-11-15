import React from 'react';
import { ListView } from 'react-native';
import { List } from 'react-native-elements';
import Article from './Article';
import SourceHeader from './SourceHeader';

const Feed = ({ dataSource }) => (
  <List containerStyle={{ marginTop: 0 }}>
    <ListView
      dataSource={dataSource}
      renderRow={rowData => <Article {...rowData} />}
      renderSectionHeader={sectionData => <SourceHeader {...sectionData} />}
    />
  </List>
);

export default Feed;
