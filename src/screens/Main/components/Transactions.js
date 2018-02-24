import { arrayOf, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, RefreshControl, View, Text } from 'react-native';
import { connect } from 'react-redux';

import { SHAPE, STYLE, THEME } from '../../../config';
import { TransactionService } from '../../../services';
import { updateTransactionsAction } from '../../../store/actions';
import TransactionItem from './TransactionItem';
import styles from './Transactions.style';

const { TRANSACTION, DEVICE } = SHAPE;

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
    const { props: { updateTransactions } } = this;

    this.setState({ refreshing: true });
    updateTransactions(await TransactionService.list());
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
        { transactions.length &&
          <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            refreshControl={<RefreshControl onRefresh={_onRefresh} refreshing={refreshing} />}
            renderItem={_renderTransaction}
            style={styles.list}
          />
        }
        { transactions.length === 0 &&
          <Text>No transactions!</Text>
        }
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

const mapStateToProps = ({ transactions, device }) => ({
  transactions, device,
});

const mapDispatchToProps = dispatch => ({
  updateTransactions: transactions => transactions && dispatch(updateTransactionsAction(transactions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
