import React from 'react';
import { ListItem, Icon } from 'react-native-elements';
import Spin from './Spin';

const SourceHeader = ({ name, loading, update, separatorColor }) => (
  <ListItem
    containerStyle={{
      backgroundColor: 'black',
      borderBottomColor: separatorColor,
    }}
    titleStyle={{ color: 'white' }}
    title={name}
    rightIcon={
      loading ? (
        <Spin>
          <Icon name="loop" color="white" onPress={update} />
        </Spin>
      ) : (
        <Icon name="loop" color="white" onPress={update} />
      )
    }
  />
);

export default SourceHeader;
