import React from 'react';
import { ListItem } from 'react-native-elements';

const Article = ({ title, description }) => (
  <ListItem title={title} subtitle={description} />
);

export default Article;
