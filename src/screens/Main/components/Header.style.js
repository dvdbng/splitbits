import { StyleSheet } from 'react-native';

import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

export default StyleSheet.create({
  amountFiat: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: 32,
    backgroundColor: COLOR.TRANSPARENT,
  },

  amount: {
    color: COLOR.TEXT_HIGHLIGHT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
    backgroundColor: COLOR.TRANSPARENT,
  },
});
