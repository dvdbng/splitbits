import { arrayOf, func, shape } from 'prop-types';
import { LinearGradient, Notifications } from 'expo';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { SHAPE, STYLE, THEME } from '../../config';
import { ModalMnemonic, ModalTransaction, ModalWallet } from '../../containers';
import { Header, Footer, TransactionButton, Transactions, Wallets } from './components';
import { onNotification } from './modules';
import { CurrenciesService, DeviceService } from '../../services';
import { updateCurrenciesAction, updateDeviceAction } from '../../store/actions';

const { COLOR } = THEME;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: undefined,
      showTransaction: false,
      showWalletNew: false,
      showWallet: false,
      showMnemonic: false,
      walletIndex: 0,
    };
    this._onMnemonic = this._onMnemonic.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onNewTransaction = this._onNewTransaction.bind(this);
    this._onWallet = this._onWallet.bind(this);
  }

  async componentWillMount() {
    const { props: { updateCurrencies, updateDevice } } = this;
    Promise.all([
      CurrenciesService.list().then(updateCurrencies),
      DeviceService.state().then(updateDevice),
    ]);
    Notifications.addListener(onNotification);
  }

  _onNewTransaction(type) {
    const {
      props: { navigation: { navigate }, wallets },
      state: { showTransaction, walletIndex },
    } = this;

    this.setState({ showTransaction: !showTransaction });
    navigate('Transaction', { type, wallet: wallets[walletIndex] });
  }

  _onModal() {
    this.setState({ showTransaction: !this.state.showTransaction });
  }

  _onMnemonic() {
    this.setState({ showMnemonic: !this.state.showMnemonic });
  }

  _onWallet() {
    this.setState({ showWallet: !this.state.showWallet });
  }

  render() {
    const {
      _onNewTransaction, _onMnemonic, _onModal, _onWallet,
      props: { i18n, navigation: { navigate }, wallets },
      state: {
        connection, showMnemonic, showTransaction, showWalletNew, showWallet, walletIndex,
      },
    } = this;
    const wallet = wallets[walletIndex];
    const focus = !showTransaction && !showWallet && !showWalletNew;


    return (
      <View style={STYLE.SCREEN}>
        <LinearGradient colors={COLOR.GRADIENT} style={STYLE.LAYOUT_TOP} >
          <Header />
          <Wallets index={walletIndex} onOptions={_onWallet} />
        </LinearGradient>
        <Transactions navigate={navigate} wallet={wallet} />
        <Footer navigate={navigate} elevation={focus} />
        <TransactionButton onPress={_onModal} visible={true} />
        <ModalTransaction visible={showTransaction} onClose={_onModal} onPress={_onNewTransaction} wallet={wallet} />
        { wallet &&
          <ModalWallet visible={showWallet && !showMnemonic} wallet={wallet} onBackup={_onMnemonic} onClose={_onWallet} /> }
        <ModalMnemonic visible={showMnemonic} onClose={_onMnemonic} wallet={wallet} />
      </View>
    );
  }
}

Main.propTypes = {
  i18n: shape({}).isRequired,
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  updateCurrencies: func,
  updateDevice: func,
  wallets: arrayOf(shape(SHAPE.WALLET)).isRequired,
};

Main.defaultProps = {
  updateCurrencies() {},
  updateDevice() {},
};

const mapStateToProps = ({ i18n, wallets }) => ({
  i18n, wallets,
});

const mapDispatchToProps = dispatch => ({
  updateCurrencies: currencies => currencies && dispatch(updateCurrenciesAction(currencies)),
  updateDevice: device => device && dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
