import nano from 'nano-lib';

import { C } from '../config';
import { SecureStore } from '../store';
import { service } from './modules';
import EntropyService from './entropy';
import PushService from './push';

const { CRYPTO: { XRB } } = C;

const getSignature = (privateKey) => {
  const timestamp = (new Date()).getTime();
  const signatureMessage = `SplitBits Add Wallet ${timestamp}$`;
  const signature = nano.sign(signatureMessage, privateKey).toString('base64');
  return { signature, timestamp };
};

export default {
  async create({ coin = XRB, name, ...props }) {
    const token = PushService.getToken();
    const seed = props.hexSeed || await EntropyService();
    const { address, privateKey } = nano.generateAddress(seed, 0);
    await SecureStore.set(`${coin}_${address}`, seed);

    const wallet = service('wallet', {
      method: 'POST',
      body: JSON.stringify({
        address,
        coin,
        name,
        proof: getSignature(privateKey),
        push: await token,
      }),
    });

    return wallet; // @TODO: Dispatch error if doesnt exist.
  },

  state({ id, ids }) {
    return service(`wallet?${id ? `id=${id}` : `ids=${ids}`}`);
  },

  addressFromHexSeed(hexSeed) {
    if (!hexSeed) return undefined;

    return nano.generateAddress(hexSeed, 0).address;
  },
};
