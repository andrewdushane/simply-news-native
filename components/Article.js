import React from 'react';
import { ListItem } from 'react-native-elements';

const Article = ({
  title,
  description,
  mainColor,
  mainBackground,
  onPress,
}) => (
  <ListItem
    containerStyle={{ backgroundColor: mainBackground }}
    titleStyle={{ color: mainColor }}
    title={title}
    subtitle={description}
    onPress={onPress}
  />
);

export default Article;
