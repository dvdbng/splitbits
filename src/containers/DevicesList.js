import { array, arrayOf, bool, func, number, oneOfType, shape, string } from 'prop-types';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { SHAPE } from '../config';
import DeviceItem from './DeviceItem';
import styles from './DevicesList.style';

const DevicesList = ({
  data, device: { friends }, onItem, onRefresh, refreshing, request, selected, style,
}) => (
  <FlatList
    data={data || friends}
    keyExtractor={item => item.id}
    refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
    renderItem={({ item }) => (
      <DeviceItem
        data={item}
        onPress={onItem}
        onRequest={onRefresh}
        request={request}
        selected={item.id === selected}
      />
    )}
    style={[styles.devices, style]}
  />
);

DevicesList.propTypes = {
  data: arrayOf(shape(SHAPE.DEVICE)),
  device: shape(SHAPE.DEVICE).isRequired,
  onItem: func,
  onRefresh: func,
  refreshing: bool,
  request: bool,
  selected: string,
  style: oneOfType([array, number]),
};

DevicesList.defaultProps = {
  data: undefined,
  onItem: undefined,
  onRefresh() {},
  refreshing: false,
  request: false,
  selected: undefined,
  style: undefined,
};

const mapStateToProps = ({ device, i18n }) => ({
  device,
  i18n,
});

export default connect(mapStateToProps)(DevicesList);
