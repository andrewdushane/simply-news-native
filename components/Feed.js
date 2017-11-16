import React from 'react';
import { SectionList } from 'react-native';
import { List } from 'react-native-elements';
import Article from './Article';
import SourceHeader from './SourceHeader';

const Feed = ({ sections, colors, openArticleDetail, updateAllSources }) => (
  <List containerStyle={{ marginTop: 0 }}>
    <SectionList
      sections={sections}
      renderItem={({ item }) => (
        <Article {...item} {...colors} onPress={openArticleDetail(item.link)} />
      )}
      renderSectionHeader={({ section }) => (
        <SourceHeader {...section} update={updateAllSources} {...colors} />
      )}
    />
  </List>
);

export default Feed;
