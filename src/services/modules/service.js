import { C, TEXT } from '../../config';
import { instance } from '../../store';
import { errorAction } from '../../store/actions';

const { DEV, TIMEOUT_SERVICE } = C;
const { EN: { ERROR_CONNECTION } } = TEXT;
const { Constants: { deviceId = 'unknown' } } = Expo || {}; // eslint-disable-line
const DEFAULT_HEADERS = {
  Accept: 'application/json',
  deviceId,
  timeout: TIMEOUT_SERVICE,
};

const callService = async(endpoint, body, method) => {
  const { dispatch } = instance.get();
  const headers = {
    ...DEFAULT_HEADERS,
    token: callService.token || '',
    'Content-Type': (body instanceof FormData) ? 'multipart/form-data' : 'application/json',
  };
  const url = `${C.SERVICE}${endpoint}`;
  body = ((typeof body) === 'object' && !(body instanceof FormData)) ? JSON.stringify(body) : body;
  method = method || (body ? 'POST' : 'GET');

  dispatch(errorAction());
  if (DEV) console.log(`[${method}] ${url}`);

  return new Promise((resolve, reject) => {
    fetch(url, { headers, method, body })  // eslint-disable-line
      .then(async(response) => {
        const json = await response.json();
        if (response.status >= 400) {
          const error = new Error();
          error.response = response;
          error.message = json.message;
          throw error;
        }
        return resolve(json.data);
      }).catch((error = {}) => {
        if (!error.response) error.message = ERROR_CONNECTION; //eslint-disable-line

        dispatch(errorAction({
          code: error.response ? error.response.status : undefined,
          endpoint,
          message: error.message,
        }));
        return resolve(null);
      });
  });
};

export default callService;
