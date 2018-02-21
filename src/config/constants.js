import { Constants } from 'expo';

const DEV = __DEV__; //eslint-disable-line

export default {

  BLOCKCHAIN_EXPLORER_URL: 'https://chain.so/address',

  CONVERSION: {
    BTC: 0.000001,
    LTC: 0.001,
  },

  CRYPTO: {
    XRB: 'XRB',
  },

  DEV,

  FIAT: {
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    JPY: 'JPY',
  },

  IS_DEVICE: Constants.isDevice,

  LANGUAGES: {
    EN: 'English',
    ES: 'Español',
  },

  SYMBOL: {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',
  },

  SERVICE: DEV
    ? Constants.linkingUrl.replace(/^\w+:\/\/([^:/]+):\d+\/.*$/, 'http://$1:4001/')
    : 'https://splitbits.sohobase.co/',

  SOHOBASE_SUPPORT: 'support@sohobase.co',

  STATE: {
    // -- Transactions
    REQUESTED: 'requested',
    UNCONFIRMED: 'unconfirmed',
    CONFIRMED: 'confirmed',
    // -- Devices
    ACTIVE: 'active',
    // -- Common
    ARCHIVED: 'archived',
    BANNED: 'banned',
  },

  STORE_URL: {
    ANDROID: 'http://',
    IOS: 'http://',
  },

  TIMEOUT_SERVICE: 3000,

  TOKEN: 'sohobase-splitbits-dev',

  TYPE: {
    CREATE: 'create',
    DEFAULT: 'default',
    IMPORT: 'import',
    PRO: 'pro',
    RECOVER: 'recover',
    REQUEST: 'request',
    SEND: 'send',
  },
};
