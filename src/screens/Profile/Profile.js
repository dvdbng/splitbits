import { func } from 'prop-types';
import React, { Component } from 'react';
import { FlatList, Image, TextInput, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';
import { updateDeviceAction } from '../../store/actions';
import { Button, Header } from '../../components';
import { CameraModal, DeviceItem } from './components';
import { C, SHAPE, STYLE, THEME } from '../../config';
import { DeviceService } from '../../services';
import styles from './Profile.style';

const { COLOR } = THEME;
const { SERVICE } = C;
let timeout;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.device.name,
      image: props.device.image,
      modal: false,
    };
    this._onFile = this._onFile.bind(this);
    this._onImage = this._onImage.bind(this);
    this._onModal = this._onModal.bind(this);
    this._onName = this._onName.bind(this);
    this._onSave = this._onSave.bind(this);
  }

  _onSave() {
    const { navigation: { goBack } } = this.props;
    DeviceService.update();
    goBack();
  }

  _onFile(image) {
    const { updateDevice } = this.props;
    this.setState({ image: image.uri, modal: false });

    DeviceService.update({ image }, updateDevice);
  }

  _onImage() {
    this.setState({ modal: true });
  }

  _onModal() {
    this.setState({ modal: !this.state.modal });
  }

  _onName(name) {
    const { updateDevice } = this.props;
    this.setState({ name });

    clearTimeout(timeout);
    timeout = setTimeout(() => { DeviceService.update({ name }, updateDevice); }, 1000);
  }

  render() {
    const {
      _onFile,
      _onImage,
      _onModal,
      _onName,
      _onSave,
      props: { device: { id, devices }, navigation },
      state: { image, modal, name },
    } = this;
    const imageUrl = image && !image.startsWith('file:')
      ? `${SERVICE}public/${image}?timestamp=${new Date().getTime()}`
      : image;

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header
            title="Profile"
            navigation={navigation}
            buttonRight={{ icon: 'add', onPress: _onSave }}
          />
          <Animatable animation="bounceIn" delay={600} style={styles.preview}>
            <View style={[STYLE.CENTERED, styles.preview]}>
              <View>
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Button accent circle icon="camera" onPress={_onImage} style={styles.buttonCamera} />
              </View>
              <View style={styles.qr}>
                <QRCode value={id} size={THEME.AVATAR_SIZE / 2} fgColor={COLOR.PRIMARY} bgColor={COLOR.WHITE} />
              </View>
              <TextInput
                autoFocus={!name || name.length === 0}
                onChangeText={_onName}
                placeholder="Choose a name..."
                style={[STYLE.INPUT_HIGHLIGHT, styles.input]}
                value={name}
              />
            </View>
          </Animatable>
        </View>


        <View style={STYLE.LAYOUT_BOTTOM}>
          <Animatable animation="bounceInUp" delay={600} style={styles.preview}>
            <FlatList
              data={devices}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <DeviceItem data={item} />}
            />
          </Animatable>
        </View>
        <CameraModal visible={modal} onClose={_onModal} onFile={_onFile} />
      </View>
    );
  }
}

Profile.propTypes = {
  device: SHAPE.DEVICE,
  navigation: SHAPE.NAVIGATION,
  updateDevice: func,
};

Profile.defaultProps = {
  device: {},
  navigation: undefined,
  updateDevice() {},
};

const mapStateToProps = ({ device }) => ({
  device,
});

const mapDispatchToProps = dispatch => ({
  updateDevice: device => dispatch(updateDeviceAction(device)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
