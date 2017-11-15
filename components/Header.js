import React from 'react';
import { Header as NativeHeader } from 'react-native-elements';

const Header = ({
  theme,
  toggleTheme,
  colors: { mainBackground, mainColor },
}) => (
  <NativeHeader
    outerContainerStyles={{ backgroundColor: mainBackground }}
    centerComponent={{
      text: 'Simply News',
      style: {
        color: mainColor,
        backgroundColor: mainBackground,
      },
    }}
    rightComponent={{
      icon: theme === 'light' ? 'brightness-2' : 'brightness-5',
      onPress: toggleTheme,
      color: mainColor,
    }}
  />
);

export default Header;
