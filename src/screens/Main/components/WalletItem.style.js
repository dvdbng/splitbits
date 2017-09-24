import { StyleSheet } from 'react-native';
import { THEME } from '../../../config';

const { COLOR, FONT } = THEME;

const QR_SIZE = THEME.UNIT * 8;

export default StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    width: '75%',
    height: '100%',
    backgroundColor: COLOR.WHITE,
    margin: THEME.OFFSET,
    alignSelf: 'flex-start',
    borderRadius: THEME.BORDER_RADIUS,
  },

  content: {
    flex: 1,
    padding: THEME.OFFSET,
  },

  info: {
    flex: 1,
  },

  name: {
    fontWeight: FONT.WEIGHT.BOLD,
  },

  label: {
    color: COLOR.TEXT_SECONDARY,
    fontSize: FONT.SIZE.SMALL,
  },

  amount: {
    color: COLOR.TEXT_DEFAULT,
    fontSize: FONT.SIZE.LARGE,
    fontWeight: FONT.WEIGHT.BOLD,
  },

  fiat: {
    fontSize: FONT.SIZE.DEFAULT,
  },

  qr: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: QR_SIZE,
    height: QR_SIZE,
  },
});
