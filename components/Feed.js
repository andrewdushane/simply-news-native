import React from 'react';
import { SectionList } from 'react-native';
import { List } from 'react-native-elements';
import Article from './Article';
import SourceHeader from './SourceHeader';

const Feed = ({ sections, colors }) => (
  <List containerStyle={{ marginTop: 0 }}>
    <SectionList
      sections={sections}
      renderItem={({ item }) => <Article {...item} {...colors} />}
      renderSectionHeader={({ section }) => <SourceHeader {...section} />}
    />
  </List>
);

export default Feed;
