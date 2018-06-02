import React from 'react';
import { SectionList } from 'react-native';
import { List } from 'react-native-elements';
import Article from './Article';
import SourceHeader from './SourceHeader';

const Feed = ({ sections, colors, openArticleDetail }) => (
  <List containerStyle={{ marginTop: 0, paddingBottom: 180 }}>
    <SectionList
      sections={sections}
      renderItem={({ item }) => (
        <Article {...item} {...colors} onPress={openArticleDetail(item.link)} />
      )}
      renderSectionHeader={({ section }) => (
        <SourceHeader {...section} {...colors} />
      )}
    />
  </List>
);

export default Feed;
