import React from 'react';
import { ListItem } from 'react-native-elements';

const SourceHeader = ({ name }) => (
  <ListItem
    containerStyle={{ backgroundColor: 'black' }}
    titleStyle={{ color: 'white' }}
    title={name}
    hideChevron
  />
);

export default SourceHeader;
