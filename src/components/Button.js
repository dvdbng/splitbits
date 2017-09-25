import { array, bool, func, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import Icon from './Icon';
import Touchable from './Touchable';
import { STYLE } from '../config';
import styles from './Button.style';

const Button = ({ accent, caption, captionStyle, circle, disabled, icon, onPress, raised, style, ...animation }) => (
  <Touchable onPress={!disabled ? onPress : undefined}>
    <Animatable
      {...animation}
      style={StyleSheet.flatten([
        styles.container,
        style,
        STYLE.CENTERED,
        (circle && styles.circle),
        (!circle && !raised && styles.square),
        (disabled && styles.disabled),
        (accent && styles.accent),
      ])}
    >
      { icon &&
        <Icon value={icon} style={[styles.icon]} /> }
      { caption &&
        <Text style={[styles.caption, captionStyle]}>{caption}</Text> }
    </Animatable>
  </Touchable>
);

Button.propTypes = {
  accent: bool,
  animation: string,
  caption: string,
  captionStyle: oneOfType(array, number),
  circle: bool,
  disabled: bool,
  icon: string,
  onPress: func,
  raised: bool,
  style: oneOfType(array, number),
};

Button.defaultProps = {
  accent: false,
  animation: undefined,
  caption: undefined,
  captionStyle: [],
  circle: false,
  disabled: false,
  icon: undefined,
  onPress: undefined,
  raised: false,
  style: [],
};

export default Button;