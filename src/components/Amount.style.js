import { StyleSheet } from 'react-native';
import { THEME } from '../config';

const { FONT } = THEME;

export default StyleSheet.create({
  amount: {
    fontSize: FONT.SIZE.DEFAULT,
  },

  symbol: {
    fontWeight: FONT.WEIGHT.LIGHT,
  },
});
