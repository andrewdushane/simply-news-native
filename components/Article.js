import React from 'react';
import { ListItem } from 'react-native-elements';

const Article = ({
  title,
  description,
  mainColor,
  mainBackground,
  separatorColor,
  tertiaryColor,
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
    subtitleStyle={{ color: tertiaryColor }}
    onPress={onPress}
    titleNumberOfLines={3}
    subtitleNumberOfLines={5}
  />
);

export default Article;
