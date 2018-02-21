import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';

import { SHAPE, STYLE, THEME } from '../../../config';
import { TransactionService } from '../../../services';
import { updateTransactionsAction } from '../../../store/actions';
import { walletTransactions } from '../modules';
import TransactionItem from './TransactionItem';
import styles from './Transactions.style';

const { TRANSACTION, DEVICE } = SHAPE;
const { ANIMATION: { DURATION } } = THEME;
let timeout;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { refreshing: false };
    this._onRefresh = this._onRefresh.bind(this);
    this._renderTransaction = this._renderTransaction.bind(this);
  }

  componentWillMount() {
    this._onRefresh();
  }

  async _onRefresh() {
    const { props: { device, updateTransactions } } = this;

    timeout = setTimeout(() => this.setState({ refreshing: true }), DURATION / 2);
    await TransactionService.list({ deviceId: device.id }).then(updateTransactions);
    clearTimeout(timeout);
    this.setState({ refreshing: false });
  }

  _renderTransaction({ item }) {
    const { navigate } = this.props;
    return <TransactionItem data={item} onPress={() => navigate('Transaction', { item })} />;
  }

  render() {
    const {
      _onRefresh, _renderTransaction,
      props: { transactions = [] },
      state: { refreshing },
    } = this;

    return (
      <View style={[STYLE.LAYOUT_BOTTOM, styles.container]}>
        <FlatList
          data={transactions}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl onRefresh={_onRefresh} refreshing={refreshing} />}
          renderItem={_renderTransaction}
          style={styles.list}
        />
      </View>
    );
  }
}

Transactions.propTypes = {
  navigate: func,
  transactions: arrayOf(shape(TRANSACTION)),
  updateTransactions: func,
  device: shape(DEVICE),
};

Transactions.defaultProps = {
  navigate() {},
  transactions: [],
  updateTransactions() {},
  device: {},
};

const mapStateToProps = ({ device, transactions }, { wallet }) => ({
  transactions: walletTransactions(device, wallet, transactions),
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: transactions => transactions && dispatch(updateTransactionsAction(transactions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
