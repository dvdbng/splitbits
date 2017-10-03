import DEFAULTS from './defaults';
import {
  ADD_TOKEN,
  UPDATE_CURRENCIES,
  ADD_WALLET,
  REMOVE_WALLET,
  UPDATE_WALLET,
} from './actions';

export default function(state = DEFAULTS, action) {
  switch (action.type) {
    // -- token
    case ADD_TOKEN:
      return { ...state, token: action.token };

    // -- Currencies
    case UPDATE_CURRENCIES:
      return { ...state, currencies: action.currencies };

    // -- Transaction

    // -- Wallet
    case ADD_WALLET:
      return { ...state, wallets: [...state.wallets, action.wallet] };

    case REMOVE_WALLET: {
      return {
        ...state,
        wallets: state.wallets.filter(({ id }) => (id !== action.wallet.id)),
      };
    }

    case UPDATE_WALLET: {
      const { id, ...props } = action.wallet;

      return {
        ...state,
        wallets: state.wallets.map((wallet) => {
          if (wallet.id === id) return { ...wallet, ...props };
          return wallet;
        }),
      };
    }

    // -- Default
    default:
      return state;
  }
}
