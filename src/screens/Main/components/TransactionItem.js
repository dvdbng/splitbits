import { func } from 'prop-types';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Amount, Icon, Touchable } from '../../../components';
import { C, SHAPE, STYLE } from '../../../config';
import styles from './TransactionItem.style';

const { DELETED, UNCONFIRMED, REQUESTED } = C.STATE;

const getIcon = (amount, state) => {
  if (amount < 0) {
    return 'arrowForward';
  } else if (state === REQUESTED) {
    return 'operations';
  } else if (state === UNCONFIRMED) {
    return 'settings';
  } else if (state === DELETED) {
    return 'close';
  }

  return 'arrowBack';
};

const TransactionItem = ({ currencies, data: { amount, coin, createdAt, state, walletFrom = {}, walletTo = {} }, device, onPress }) => (
  <Touchable onPress={onPress} activeOpacity={0.95}>
    <View style={[STYLE.ROW, STYLE.LIST_ITEM, styles.container]}>
      <View>
        <Image style={styles.image} source={{ uri: walletFrom.image }} />
        <Icon
          value={getIcon(amount, state)}
          style={[styles.iconArrow, (amount < 0 && styles.iconNegative), (state === DELETED && styles.iconInactive)]}
        />
      </View>
      <View style={styles.info}>
        <Text style={[styles.name]}>{walletFrom.name}</Text>
        <Text style={[styles.label, styles.date]}>{createdAt.toString().substr(0, 10)}</Text>
      </View>
      <View style={styles.amounts}>
        <Amount coin={coin} value={amount} style={[styles.amount]} />
        <Amount coin={device.currency} value={amount / currencies[coin]} style={[styles.label, styles.fiat]} />
      </View>
    </View>
  </Touchable>
);

TransactionItem.propTypes = {
  currencies: SHAPE.CURRENCIES,
  data: SHAPE.TRANSACTION,
  device: SHAPE.DEVICE,
  onPress: func,
};

TransactionItem.defaultProps = {
  currencies: {},
  data: {},
  device: {},
  onPress: undefined,
};

const mapStateToProps = ({ currencies, device }) => ({
  currencies,
  device,
});

export default connect(mapStateToProps)(TransactionItem);
