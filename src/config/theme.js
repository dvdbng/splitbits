import Color from 'color';

const UNIT = 10;
const WHITE = '#ffffff';
const BLACK = '#000000';
const PRIMARY = '#3f51b5';
// const PRIMARY = '#333333';
const ACCENT = '#e91e63';
const DISABLED = 0.38;

export default {
  ANIMATION: {
    DURATION: 900,
    EASING: 'ease-in-out-sine',
  },

  COLOR: {
    PRIMARY,
    PRIMARY_LIGHT: Color(WHITE).lighten(0.2),
    PRIMARY_DARK: Color(WHITE).darken(0.2),

    ACCENT,

    BACKGROUND: Color(WHITE).darken(0.03),
    BACKGROUND_HIGHLIGHT: Color(WHITE).alpha(0.15),
    BACKGROUND_DARK: Color(BLACK).alpha(0.5),
    BACKGROUND_DISABLED: Color(BLACK).alpha(DISABLED),

    DIVIDER: Color(WHITE).darken(0.1),

    TEXT_DEFAULT: Color(BLACK).alpha(0.87),
    TEXT_SECONDARY: Color(BLACK).alpha(0.54),
    TEXT_DISABLED: Color(BLACK).alpha(DISABLED),
    TEXT_HIGHLIGHT: Color(WHITE).alpha(1),
    TEXT_HIGHLIGHT_SECONDARY: Color(WHITE).alpha(0.7),
    TEXT_HIGHLIGHT_DISABLED: Color(WHITE).alpha(0.45),

    ACCEPT: '#4CAF50',
    CANCEL: '#F44336',
    WHITE,
    BLACK,
  },

  DISABLED,

  FONT: {
    SIZE: {
      TINY: UNIT * 1,
      SMALL: UNIT * 1.2,
      DEFAULT: UNIT * 1.6,
      LARGE: UNIT * 2,
      EXTRA_LARGE: UNIT * 2.4,
    },
    WEIGHT: {
      LIGHT: '200',
      DEFAULT: '400',
      BOLD: '700',
    },
  },

  AVATAR_SIZE: UNIT * 4,
  BORDER_RADIUS: UNIT / 2,
  BUTTON_CIRCLE_SIZE: UNIT * 6.4,
  FOOTER_SIZE: UNIT * 5.6,
  HEADER_SIZE: UNIT * 6,
  ICON_SIZE: UNIT * 3.2,
  OFFSET: UNIT * 1.6,
  ROW_MIN_HEIGHT: UNIT * 6.4,
  QR_SIZE: 6.4 * UNIT,
  UNIT,
};
