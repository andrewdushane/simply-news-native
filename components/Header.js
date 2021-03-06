import React from 'react';
import { Header as NativeHeader, Icon } from 'react-native-elements';

const Header = ({
  theme,
  refresh,
  colors: { mainBackground, mainColor, headerBackground },
}) => (
  <NativeHeader
    outerContainerStyles={{ backgroundColor: headerBackground, marginTop: 20 }}
    statusBarProps={{ barStyle: 'dark-content' }}
    backgroundColor={headerBackground}
    centerComponent={{
      text: 'Simply News',
      style: {
        color: mainColor,
        backgroundColor: headerBackground,
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 20,
        paddingTop: 20,
      },
    }}
    rightComponent={
      <Icon
        name="loop"
        color={mainColor}
        onPress={refresh}
        underlayColor="transparent"
      />
    }
  />
);

export default Header;
