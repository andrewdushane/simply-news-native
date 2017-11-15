import React from 'react';
import { Header as NativeHeader } from 'react-native-elements';

const Header = () => (
  <NativeHeader
    outerContainerStyles={{ backgroundColor: 'white' }}
    centerComponent={{
      text: 'Simply News',
      style: {
        color: 'black',
        backgroundColor: 'white',
      },
    }}
  />
);

export default Header;
