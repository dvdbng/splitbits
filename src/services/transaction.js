import nano from 'nano-lib';

import { SecureStore } from '../store';
import { service } from './modules';

export default {
  list() {
    // TODO: Receive pending here
    return service('blocks/list');
  },

  request(props) {
    return service('transaction/request', { method: 'POST', body: JSON.stringify(props) });
  },

  async send({ amount, destination }, { address }) {
    const { balance, previous } = await service('transaction/prepare', { method: 'POST', body: { address } });
    const newBalance = balance - amount;
    const secret = await SecureStore.get(`XRB_${address}`);
    const { privateKey } = nano.generateAddress(secret, 0);
    const block = nano.sendBlock({
      previous,
      newBalance,
      privateKey,
      destination,
    });
    return service('transaction/send', { method: 'POST', body: JSON.stringify(block) });
  },

  archive(id, walletId) {
    return service(`transaction/${id}`, { method: 'DELETE', body: JSON.stringify({ walletId }) });
  },

  update(id, props) {
    return service(`transaction/${id}`, { method: 'PUT', body: JSON.stringify(props) });
  },
};
