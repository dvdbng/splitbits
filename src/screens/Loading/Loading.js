import { Font } from 'expo';
import { func } from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { StatusBar, StyleSheet, View } from 'react-native';

import { updateCurrenciesAction, updateDeviceAction, errorAction } from '../../store/actions';
import { Logo } from '../../components';
import { ASSETS, STYLE, THEME } from '../../config';
import { CurrenciesService, DeviceService } from '../../services';
import { service } from '../../services/modules';
import { initialize } from '../../store';
import styles from './Loading.style';

const { COLOR } = THEME;

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentWillMount() {
    const fontLoad = Font.loadAsync({ 'pt-mono-regular': ASSETS.PTMonoRegular });
    const { onLoad } = this.props;
    const store = await initialize();
    const { dispatch } = store;
    const { device: { accessToken } = {} } = store.getState();
    dispatch(errorAction());

    if (accessToken) {
      service.token = accessToken;
      await Promise.all([
        CurrenciesService.list().then(value => value && dispatch(updateCurrenciesAction(value))),
        DeviceService.state().then(value => value && dispatch(updateDeviceAction(value))),
      ]);
    }

    await fontLoad;
    setTimeout(() => { onLoad({ store }); }, 0);
  }

  render() {
    return (
      <View style={StyleSheet.flatten([STYLE.SCREEN, STYLE.CENTERED, styles.loading])}>
        <StatusBar backgroundColor={COLOR.PRIMARY} barStyle="light-content" />
        <Logo />
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
