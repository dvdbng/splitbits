import { array, bool, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import { C, STYLE } from '../config';
import styles from './Amount.style';

const {
  CONVERSION, FIAT, SATOSHI, SYMBOL,
} = C;

const renderSymbol = ({ coin, style }) => ( // eslint-disable-line
  <Text style={[styles.amount, style, styles.symbol]}>
    {Object.keys(SYMBOL).includes(coin) ? SYMBOL[coin] : SYMBOL[coin.toUpperCase()] || coin.toUpperCase()}
  </Text>
);

const Amount = (props) => {
  const {
    caption, coin, style, symbol,
  } = props;
  const value = props.value || 0;
  const decimals = Object.values(FIAT).includes(coin) ? 2 : 4;

  return (
    <View style={STYLE.ROW}>
      { caption && <Text style={[styles.amount, style]}>{caption.replace(/\b\w/g, l => l.toUpperCase())}</Text> }
      { value < 0 && <Text style={[styles.amount, style]}>-</Text> }
      { symbol && value > 0 && <Text style={[styles.amount, style]}>+</Text> }
      { coin === FIAT.USD && renderSymbol(props) }
      <Text style={[styles.amount, style]}>
        {
          parseFloat(Math.abs(value))
            .toFixed(decimals)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        }
      </Text>
      { coin !== FIAT.USD && renderSymbol(props) }
    </View>
  );
};

Amount.propTypes = {
  caption: string,
  coin: string,
  style: oneOfType([array, number]),
  symbol: bool,
  value: number,
};

Amount.defaultProps = {
  caption: undefined,
  coin: 'BTC',
  style: [],
  symbol: false,
  value: 0,
};

export default Amount;
