import nano from 'nano-lib';

import { service } from './modules';

export default {
  state({ id, ids }) {
    return service(`wallet?${id ? `id=${id}` : `ids=${ids}`}`);
  },

  addressFromHexSeed(hexSeed) {
    if (!hexSeed) return undefined;

    return nano.generateAddress(hexSeed, 0).address;
  },
};
