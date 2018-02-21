import { any } from 'prop-types';
import { View } from 'react-native';
import React from 'react';

const Motion = ({
  duration,
  animation,
  ...props
}) => (
  <View {...props} />
);


Motion.propTypes = {
  animation: any,
  duration: any,
};

Motion.defaultProps = {
  animation: null,
  duration: null,
};

export default Motion;
