import BitcoinJS from 'bitcoinjs-lib';
import { service } from './modules';
import { C } from '../config';

const { CRYPTO_NAMES } = C;

const walletToECPair = (wallet, network) => {
  if (wallet.wif) {
    return BitcoinJS.ECPair.fromWIF(wallet.wif, network);
  }
  return BitcoinJS.HDNode.fromSeedHex(wallet.hexSeed, network).keyPair;
};

export default {

  fees(coin, amount) {
    return service(`transaction/fee?coin=${coin}&amount=${amount}`);
  },

  list(walletId) {
    return service(`transaction/list?walletId=${walletId}`);
  },

  request(props) {
    return service('transaction/request', { method: 'POST', body: JSON.stringify(props) });
  },

  async send(props, wallet) {
    const network = BitcoinJS.networks[CRYPTO_NAMES[wallet.coin]];
    const { tx: hexTx, fee } = await service('transaction/prepare', { method: 'POST', body: JSON.stringify(props) });
    const tx = BitcoinJS.TransactionBuilder.fromTransaction(BitcoinJS.Transaction.fromHex(hexTx), network);
    // @TODO: verify outputs are what we expect
    tx.sign(0, walletToECPair(wallet, network)); // @TODO try/catch
    const body = JSON.stringify({ ...props, fee, tx: tx.build().toHex() });
    return service('transaction/send', { method: 'POST', body });
  },

  cancelRequest(id, walletId) {
    return service(`transaction/request/${id}`, { method: 'DELETE', body: JSON.stringify({ walletId }) });
  },
};
