import { func, shape, string } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Amount, QRreader, Motion } from '../../components';
import { C, SHAPE, STYLE } from '../../config';
import { ConnectionService, TransactionService } from '../../services';
import { updateRecipientAction, updateTransactionsAction } from '../../store/actions';
import { AmountTransaction, ButtonSubmit, Recipient, Info } from './components';
import { submit } from './modules';
import styles from './Transaction.style';

const {
  SATOSHI, STATE: { REQUESTED }, TYPE: { SEND, REQUEST },
} = C;
let timeout;

class Transaction extends Component {
  constructor(props) {
    super(props);
    const { item = {} } = props;

    this.state = {
      amount: item.amount,
      camera: false,
      concept: undefined,
      connection: undefined,
      processing: false,
    };
    this._onAddress = this._onAddress.bind(this);
    this._onAmount = this._onAmount.bind(this);
    this._onCamera = this._onCamera.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onConcept = this._onConcept.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  async componentWillMount() {
    const { props: { updateRecipient, item: { amount, state, to } = {}, wallet } } = this;
    updateRecipient();
    this.setState({ connection: await ConnectionService.get() });
  }

  _onAddress(address) {
    this.props.updateRecipient({ address });
    this.setState({ camera: false });
  }

  _onAmount(amount) {
    const { props: { type } } = this;
    this.setState({ amount });
    clearTimeout(timeout);
  }

  _onCamera() {
    this.setState({ camera: !this.state.camera });
  }

  _onConcept(concept) {
    this.setState({ concept });
  }

  async _onSubmit() {
    this.setState({ processing: true });
    const transaction = await submit(this);
    if (transaction && transaction.id) {
      const { navigation, updateTransactions } = this.props;
      updateTransactions(transaction);
      this.setState({ processing: false });
      navigation.goBack();
    }
  }

  async _onCancel() {
    const {
      item: { id }, navigation, updateTransactions, wallet,
    } = this.props;

    const transaction = await TransactionService.archive(id, wallet.id);
    if (transaction && transaction.id) {
      updateTransactions(transaction);
      navigation.goBack();
    }
  }

  render() {
    const {
      _onAddress, _onAmount, _onCancel, _onCamera, _onConcept, _onSubmit,
      props: {
        currencies, device: { currency }, i18n, item, navigation, type, wallet,
      },
      state: {
        amount = 0, camera, concept, processing,
      },
    } = this;
    const { coin } = wallet;
    const editable = !item;
    const amountProps = {
      coin, editable, item, navigation, wallet,
    };
    const recipientProps = {
      concept, navigation, onCamera: _onCamera, onConcept: _onConcept, type, wallet,
    };

    return (
      <View style={STYLE.SCREEN}>
        <AmountTransaction {...amountProps} onAmount={_onAmount} />
        <View style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          { editable ? <Recipient {...recipientProps} /> : <Info item={item} /> }
          <View style={styles.buttons}>
            { (editable || item.state === REQUESTED) &&
              <ButtonSubmit
                amount={editable ? amount / SATOSHI : item.amount}
                concept={concept}
                item={item}
                onCancel={_onCancel}
                onPress={_onSubmit}
                processing={processing}
                type={type}
                wallet={wallet}
              /> }
          </View>
        </View>
        <QRreader active={camera} onClose={_onCamera} onRead={_onAddress} />
      </View>
    );
  }
}

Transaction.propTypes = {
  currencies: shape(SHAPE.CURRENCIES).isRequired,
  device: shape(SHAPE.DEVICE).isRequired,
  i18n: shape({}).isRequired,
  item: shape(SHAPE.TRANSACTION),
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  recipient: shape(SHAPE.RECIPIENT),
  type: string.isRequired,
  updateRecipient: func.isRequired,
  updateTransactions: func.isRequired,
  wallet: shape(SHAPE.WALLET).isRequired,
};

Transaction.defaultProps = {
  item: undefined,
  recipient: undefined,
};

const mapStateToProps = (
  {
    currencies, device, i18n, recipient,
  },
  props,
) => {
  const { item, type = REQUEST, wallet = {} } = props.navigation.state.params;

  return {
    currencies, device, i18n, item, recipient, type, wallet,
  };
};

const mapDispatchToProps = dispatch => ({
  updateRecipient: recipient => dispatch(updateRecipientAction(recipient)),
  updateTransactions: transaction => dispatch(updateTransactionsAction([transaction])),
});

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
