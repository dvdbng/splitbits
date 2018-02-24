import { TEXT } from '../config';
import DEFAULTS from './defaults';
import {
  UPDATE_CURRENCIES,
  UPDATE_DEVICE,
  ERROR,
  RESET,
  ADD_TOKEN,
  UPDATE_TRANSACTIONS,
  UPDATE_RECIPIENT,
} from './actions';

export default function(state = DEFAULTS, action) {
  switch (action.type) {
    // -- Currencies
    case UPDATE_CURRENCIES:
      return { ...state, currencies: action.currencies };

    // -- Device
    case UPDATE_DEVICE: {
      const device = { ...state.device, ...action.device };

      return {
        ...state, device, i18n: TEXT[device.language] || TEXT.EN,
      };
    }

    // -- Error
    case ERROR:
      return { ...state, error: action.error };

    // -- Recipient
    case UPDATE_RECIPIENT:
      return { ...state, recipient: action.recipient ? { ...action.recipient } : undefined };

    // -- Reset
    case RESET:
      return { ...DEFAULTS };

    // -- token
    case ADD_TOKEN:
      return { ...state, token: action.token };

    // -- Transaction
    case UPDATE_TRANSACTIONS: {
      const { transactions: actionTXs = [] } = action;
      const { transactions: stateTXs = [] } = state;

      return {
        ...state,
        transactions: [
          ...actionTXs.filter(tx => stateTXs.find(({ hash }) => hash === tx.hash) === undefined),
          ...stateTXs.map(tx => actionTXs.find(({ hash }) => hash === tx.hash) || tx),
        ],
      };
    }

    // -- Default
    default:
      return state;
  }
}
