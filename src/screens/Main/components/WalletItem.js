import { array, func, number, oneOfType, shape } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { ASSETS, C, SHAPE, STYLE, THEME } from '../../../config';
import { Amount, Button, Touchable, Motion } from '../../../components';
import { walletTransactions } from '../modules';
import styles from './WalletItem.style';

const { SATOSHI, TYPE } = C;
const { ANIMATION: { DURATION } } = THEME;
const NEW_WALLET_OPTIONS = ['CREATE', 'IMPORT', 'RECOVER'];

const MMYY = (value) => {
  const date = value ? new Date(value) : new Date();
  let MM = date.getMonth() + 1;
  if (MM < 10) MM = `0${MM}`;
  const YY = date.getUTCFullYear().toString().substring(2);

  return `${MM}/${YY}`;
};

const WalletItem = ({
  currencies,
  data: {
    address, balance = 0, coin, id, name = '', readOnly, type,
  } = {},
  device: { currency },
  firstTransaction: { createdAt } = {},
  i18n,
  onPress,
  style,
}) => {
  const isPRO = type === TYPE.PRO;
  const styleText = isPRO || readOnly ? styles.textHighlight : styles.text;

  return (
    <Touchable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.amounts}>
          <View style={STYLE.ROW}>
            <Amount coin={coin} value={balance} style={[styleText, styles.amount]} />
            <View style={styles.tags}>
              { isPRO && !readOnly && <View style={styles.tag}><Text style={styles.tagLabel}>PRO</Text></View> }
              { readOnly &&
                <View style={styles.tag}><Text style={styles.tagLabel}>{i18n.READ_ONLY}</Text></View> }
            </View>
          </View>
          <Amount
            coin={currency}
            value={balance / (currencies[coin] / SATOSHI)}
            style={[styleText, styles.fiat]}
          />
        </View>

        <Text style={[styleText, styles.typeWriter]}>{name.toUpperCase()}</Text>
        <View style={[STYLE.ROW, styles.address]}>
          <Text style={[styleText, styles.typeWriter]}>{address}</Text>
        </View>
        <View style={STYLE.ROW}>
          <Text style={[styleText, styles.typeWriter, styles.date]}>{MMYY(createdAt)}</Text>
          <Image source={ASSETS[coin]} style={styles.coinLogo} />
        </View>
      </View>
    </Touchable>
  );
};

WalletItem.propTypes = {
  currencies: shape(SHAPE.CURRENCIES),
  data: shape(SHAPE.WALLET).isRequired,
  device: shape(SHAPE.DEVICE).isRequired,
  firstTransaction: shape(SHAPE.TRANSACTION),
  i18n: shape(SHAPE.I18N).isRequired,
  onPress: func,
  style: oneOfType([array, number]),
};

WalletItem.defaultProps = {
  currencies: {},
  firstTransaction: undefined,
  onPress: undefined,
  style: [],
};

const mapStateToProps = ({
  currencies, device, i18n, transactions,
}, { data: wallet }) => {
  const storeTransactions = walletTransactions(device, wallet, transactions) || [];

  return ({
    currencies: currencies[device.currency],
    device,
    firstTransaction: storeTransactions[storeTransactions.length - 1],
    i18n,
  });
};

export default connect(mapStateToProps)(WalletItem);
