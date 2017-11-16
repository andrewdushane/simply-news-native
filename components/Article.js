import React from 'react';
import { ListItem } from 'react-native-elements';

const Article = ({
  title,
  description,
  mainColor,
  mainBackground,
  separatorColor,
  onPress,
}) => (
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
);

export default Article;
