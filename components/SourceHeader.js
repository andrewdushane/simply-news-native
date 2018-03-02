import React from 'react';
import { ListItem, Icon } from 'react-native-elements';

const SourceHeader = ({
  name,
  separatorColor,
  secondaryBackground,
  secondaryColor,
  toggle,
  expanded,
  expandable,
}) => (
  <ListItem
    containerStyle={{
      backgroundColor: secondaryBackground,
      borderBottomColor: separatorColor,
    }}
    titleStyle={{ color: secondaryColor, fontWeight: 'bold' }}
    title={name}
    rightIcon={
      <Icon
        name={`expand-${expanded ? 'less' : 'more'}`}
        color={secondaryColor}
        onPress={toggle}
        underlayColor="transparent"
      />
    }
    hideChevron={!expandable}
  />
);

export default SourceHeader;
