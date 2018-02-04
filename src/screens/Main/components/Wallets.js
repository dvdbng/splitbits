import { func, shape } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { SHAPE } from '../../../config';
import WalletItem from './WalletItem';

const { WALLET } = SHAPE;

const Wallets = ({
  onOptions, wallet,
}) => (
  <WalletItem data={wallet} onPress={onOptions} />
);

Wallets.propTypes = {
  onOptions: func,
  wallet: shape(WALLET),
};

Wallets.defaultProps = {
  onOptions() {},
  wallet: {},
};

const mapStateToProps = ({ wallet }) => ({
  wallet,
});

export default connect(mapStateToProps)(Wallets);
