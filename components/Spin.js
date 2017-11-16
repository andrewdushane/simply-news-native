import React from 'react';
import { Animated, Easing } from 'react-native';

class Spin extends React.Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.spin();
  }
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
    }).start(() => this.spin());
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

export default Spin;
