import { Constants } from 'expo';

const DEV = __DEV__; //eslint-disable-line
const LOGO = require('../../assets/app-brandname.png');

export default {
  CRYPTO: {
    BTC: 'BTC',
    LTC: 'LTC',
  },

  DEV,

  FIAT: {
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    JPY: 'JPY',
  },

  MIN_CONFIRMATIONS: 3,

  NETWORKS: {
    BTC: DEV ? 'testnet' : 'bitcoin',
    LTC: DEV ? 'testnet' : 'litecoin',
  },

  LOGO,

  SYMBOL: {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',

    BTC: '฿', // ₿
    LTC: 'Ł',
  },

  SATOSHI: 0.00000001,

  SERVICE: DEV
    ? Constants.linkingUrl.replace(/^\w+:\/\/([^:/]+):\d+\/.*$/, 'http://$1:3000/')
    : 'https://splitbits.sohobase.co/',

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
    DEFAULT: 'default',
    PRO: 'pro',
    REQUEST: 'request',
    SEND: 'send',
  },

  WALLET: {
    ADDRESS: {
      BTC: 0,
      BTC_TESTNET: 111,
      LTC: 48,
    },
    WIF: {
      BTC: 128,
      BTC_TESTNET: 239,
      LTC: 176,
    },
  },
};
