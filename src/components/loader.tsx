import { Cls } from '@src/commonCSS/Colors';
import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ opacity = 0.4, loading = false }) => {
  return (
    <Modal transparent={true} visible={loading}>
      <View style={[styles.modalBackground, { backgroundColor: `rgba(0, 0, 0, ${opacity})` }]}>
        <View style={[styles.activityIndicatorWrapper]}>
          <ActivityIndicator color={Cls.ThemeColor} size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(Loader);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});
