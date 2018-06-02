import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Spin from './Spin';

const Loading = ({ color }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text
      style={{
        color,
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: 'center',
      }}
    >
      Simply News
    </Text>
    <Text
      style={{
        color,
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
      }}
    >
      Getting the latest news...
    </Text>
    <Spin>
      <Icon name="loop" color={color} underlayColor="transparent" />
    </Spin>
  </View>
);

export default Loading;
