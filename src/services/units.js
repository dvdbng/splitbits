import bigInt from 'big-integer';

const NANO = bigInt('1e30', 10);
const xrb = bigInt('1e24', 10);

function rawToNano(raw) {
  return bigInt(raw || '0', 10).divide(xrb).toJSNumber() / 1e6;
}

export default { rawToNano };
