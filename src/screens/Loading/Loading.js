import { func } from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import { updateCurrenciesAction, updateWalletAction } from '../../store/actions';
import { Logo } from '../../components';
import { STYLE } from '../../config';
import { StateService } from '../../services';
import { initialize } from '../../store';
import styles from './Loading.style';

class Loading extends Component {
  async componentWillMount() {
    const { onLoad } = this.props;
    const store = await initialize();
    const { wallets } = store.getState();

    if (wallets.length > 0) {
      const response = await StateService.get(wallets.map(({ id }) => id));

      if (response) {
        response.wallets.forEach(wallet => store.dispatch(updateWalletAction(wallet)));
        store.dispatch(updateCurrenciesAction(response.currencies));
      }
    }

    onLoad({ store });
  }

  render() {
    return (
      <View style={StyleSheet.flatten([STYLE.SCREEN, STYLE.CENTERED, styles.loading])}>
        <Animatable animation="bounceIn" duration={1000}>
          <Logo />
        </Animatable>
      </View>
    );
  }
}

Loading.propTypes = {
  onLoad: func,
};

Loading.defaultProps = {
  onLoad() {},
};

export default Loading;
