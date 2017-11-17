import React from 'react';
import { ListItem } from 'react-native-elements';
import NeverUpdate from './NeverUpdate';

const Article = ({
  title,
  description,
  mainColor,
  mainBackground,
  separatorColor,
  onPress,
}) => (
  <NeverUpdate>
    <ListItem
      containerStyle={{
        backgroundColor: mainBackground,
        borderBottomColor: separatorColor,
      }}
      titleStyle={{ color: mainColor }}
      title={title}
      subtitle={description}
      onPress={onPress}
    />
  </NeverUpdate>
);

export default Article;
