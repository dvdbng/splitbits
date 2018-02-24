import nanoJS from 'nano-lib';
import { Constants } from 'expo';

import { service } from './modules';
import { SecureStore } from '../store';
import EntropyService from './entropy';
import PushService from './push';

const { deviceId } = Constants;
const signatureMessage = `This is pico app on behalf of a user. We want to log into this account from device ${deviceId}.`;

export default {
  async create() {
    const seed = await EntropyService();
    const { address, secret } = nanoJS.address.fromSeed(nanoJS.encoding.hexDecode(seed), 0);
    await SecureStore.set(address, seed);
    const signature = nanoJS.message.sign(signatureMessage, secret).toString('base64');

    const props = {
      address,
      deviceId,
      signature,
      currency: 'USD',
      language: 'EN',
      pushToken: await PushService.getToken(),
    };

    const resp = await service('user', props);
    if (resp.accessToken) service.token = resp.accessToken;
    return resp;
  },

  async update(props) {
    //const body = new FormData(); // eslint-disable-line
    //if (image) {
    //  const uri = image.uri.split('.');
    //  const fileType = uri[uri.length - 1];
    //  body.append('image', {
    //    uri: image.uri,
    //    name: `photo.${fileType}`,
    //    type: `image/${fileType}`,
    //  });
    //}
    //if (currency) body.append('currency', currency);
    //if (language) body.append('language', language);
    //if (name) body.append('name', name);
    //if (trend) body.append('trend', trend);

    return service('user', props, 'PUT');
  },

  search(query) {
    if (query.length < 3) {
      return new Promise(resolve => resolve([]));
    }
    return service(`friends/search?q=${query}`);
  },

  state() {
    return service('me');
  },

  add(id) {
    return service('friends/add', { id });
  },

  qr(id) {
    return service('friends/add', { id, qr: true });
  },

  hide(id) {
    return service('friends/hide', { id });
  },

  remove(id) {
    return service('device/remove', { id }, 'DELETE');
  },
};
