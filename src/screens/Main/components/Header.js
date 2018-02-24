import { arrayOf, shape, number } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { Amount, Header } from '../../../components';
import { units } from '../../../services';
import { C, SHAPE } from '../../../config';
import styles from './Header.style';

const { CURRENCIES, DEVICE, WALLET } = SHAPE;

const HeaderTitle = ({
  rate, device,
}) => {
  const totalBalance = units.rawToNano(device.balance);
  const { currency } = device;

  return (
    <Header>
      <Amount coin={currency} value={totalBalance * rate} style={styles.amountFiat} />
      <Amount coin="Nano" value={totalBalance} style={styles.amount} />
    </Header>
  );
};

HeaderTitle.propTypes = {
  rate: number,
  device: shape(DEVICE),
};

HeaderTitle.defaultProps = {
  rate: 0,
  device: undefined,
};

const mapStateToProps = ({ currencies, device, wallets }) => ({
  rate: currencies[device.currency],
  device,
  wallets,
});

export default connect(mapStateToProps)(HeaderTitle);
