import { SecureStore } from 'expo';
import { bool, func, shape } from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Button, Input, Modal } from '../components';
import { SHAPE, STYLE } from '../config';
import { MnemonicService } from '../services';
import { updateDeviceAction } from '../store/actions';
import styles from './ModalMnemonic.style';

const { DEVICE } = SHAPE;
const WORDS_LENGTH = 12;

class ModalMnemonic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      word5: '',
      word9: '',
      confirm: false,
    };

    this._onBackup = this._onBackup.bind(this);
    this._onRecover = this._onRecover.bind(this);
    this._onConfirm = this._onConfirm.bind(this);
  }

  async componentWillReceiveProps({ visible, device: { address } }) {
    if (!visible) return;
    const hexSeed = address && await SecureStore.getItemAsync(address);

    this.setState({
      word5: '',
      word9: '',
      confirm: false,
      words: MnemonicService.backup(hexSeed),
    });
  }

  _onRecover() {
  }

  _onBackup() {
    const { props: { onClose, updateDevice } } = this;
    updateDevice({ seedBackup: true });
    onClose();
  }

  _onConfirm() {
    this.setState({ confirm: true });
  }

  render() {
    const {
      _onBackup, _onRecover, _onValue, _onConfirm,
      props: {
        i18n, onClose, visible, device: { address, hexSeed },
      },
      state: { words = [], word5, word9, confirm },
    } = this;
    const readOnly = true;

    return (
      <Modal
        hint={confirm ? i18n.CONFIRM_PAPER_WALLET : i18n.PAPER_WALLET}
        onClose={onClose}
        style={STYLE.CENTERED}
        title={i18n.PAPER_KEY}
        visible={visible}
      >
        { !confirm &&
          <View style={[STYLE.ROW, styles.words]}>
            { words.map((value, i) => (
              <Input
                editable={!readOnly}
                key={i.toString()}
                onChangeText={text => _onValue(i, text)}
                placeholder={`${i18n.WORD} ${i + 1}`}
                style={[styles.word, (!readOnly && styles.input)]}
                value={`${i+1}: ${value}`}
              />)) }
          </View>
        }
        { confirm && 
          <View style={[STYLE.ROW, styles.words]}>
            <Input onChangeText={text => this.setState({ word5: text})} placeholder="5th Word" style={[styles.word, styles.input]} />
            <Input onChangeText={text => this.setState({ word9: text})} placeholder="9th Word" style={[styles.word, styles.input]} />
          </View>
        }

        <Button
          accent
          caption={confirm ? i18n.PAPER_KEY_DONE : i18n.NEXT}
          disabled={confirm && (word5 !== words[4] || word9 !== words[8])}
          onPress={confirm ? _onBackup : _onConfirm}
          style={styles.button}
        />
      </Modal>
    );
  }
}

ModalMnemonic.propTypes = {
  i18n: shape({}).isRequired,
  onClose: func,
  onRecover: func,
  visible: bool,
  updateDevice: func,
  device: shape(DEVICE),
};

ModalMnemonic.defaultProps = {
  onClose() {},
  onRecover() {},
  updateDevice() {},
  visible: false,
  device: {},
};

const mapStateToProps = ({ i18n, device }) => ({ i18n, device });

const mapDispatchToProps = dispatch => ({
  updateDevice: device => dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalMnemonic);
