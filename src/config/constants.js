const DEV = __DEV__; //eslint-disable-line

export default {
  CRYPTO: {
    BTC: 'BTC',
    LTC: 'LTC',
  },

  CRYPTO_NAMES: {
    BTC: DEV ? 'testnet' : 'bitcoin',
    LTC: 'litecoin',
  },

  DEFAULTS: {
    TOKEN: 'sohobase-splitbits-dev',
  },

  DEV,

  FIAT: {
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    JPY: 'JPY',
  },

  MIN_CONFIRMATIONS: 3,

  SYMBOL: {
    EUR: '€',
    USD: '$',
    GBP: '£',
    JPY: '¥',

    BTC: '฿',
    LTC: 'Ł',
  },

  SATOSHI: 0.00000001,

  // SERVICE: 'http://localhost:3000/',
  // SERVICE: 'http://100.76.165.45:3000/',
  SERVICE: DEV ? 'http://100.76.165.45:3000/' : 'http://splitbits.sohobase.co',

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
