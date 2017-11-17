import React from 'react';

class NeverUpdate extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return this.props.children;
  }
}

export default NeverUpdate;
