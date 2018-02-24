import { shape } from 'prop-types';
import { LinearGradient, Notifications } from 'expo';
import React, { Component } from 'react';
import { View } from 'react-native';

import { SHAPE, STYLE, THEME } from '../../config';
import { Header, Footer, TransactionButton, Transactions } from './components';
import { onNotification } from './modules';
import { ModalTransaction } from '../../containers';

const { COLOR } = THEME;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTransaction: false,
      showWalletNew: false,
      showWallet: false,
    };
    this._onModal = this._onModal.bind(this);
    this._onNewTransaction = this._onNewTransaction.bind(this);
    this._onWallet = this._onWallet.bind(this);
  }

  async componentWillMount() {
    // const { props: { updateCurrencies, updateDevice } } = this;
    // Promise.all([
    //   CurrenciesService.list().then(updateCurrencies),
    //   DeviceService.state().then(updateDevice),
    // ]);
    Notifications.addListener(onNotification);
  }

  _onNewTransaction(type) {
    const {
      props: { navigation: { navigate } },
    } = this;

    this.setState({ showTransaction: false });
    navigate('Transaction', { type });
  }

  _onModal() {
    this.setState({ showTransaction: !this.state.showTransaction });
  }

  _onWallet() {
    // this.setState({ showWallet: !this.state.showWallet });
  }

  render() {
    const {
      _onNewTransaction, _onModal,
      props: { navigation: { navigate } },
      state: {
        showTransaction, showWalletNew, showWallet,
      },
    } = this;
    const focus = !showTransaction && !showWallet && !showWalletNew;


    return (
      <View style={STYLE.SCREEN}>
        <LinearGradient colors={COLOR.GRADIENT} style={STYLE.LAYOUT_TOP} >
          <Header />
        </LinearGradient>
        <Transactions navigate={navigate} />
        <Footer navigate={navigate} elevation={focus} />
        <TransactionButton onPress={_onModal} visible />
        <ModalTransaction visible={showTransaction} onClose={_onModal} onPress={_onNewTransaction} />
      </View>
    );
  }
}

Main.propTypes = {
  navigation: shape(SHAPE.NAVIGATION).isRequired,
  // updateCurrencies: func,
  // updateDevice: func,
};

// Main.defaultProps = {
//   updateCurrencies() {},
//   updateDevice() {},
// };
//
// const mapStateToProps = () => ({});
//
// const mapDispatchToProps = dispatch => ({
//   updateCurrencies: currencies => currencies && dispatch(updateCurrenciesAction(currencies)),
//   updateDevice: device => device && dispatch(updateDeviceAction(device)),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(Main);
export default Main;
