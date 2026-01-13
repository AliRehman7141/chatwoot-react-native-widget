import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Appearance,
  View,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import { storeHelper, findColors } from './utils';
import WebView from './WebView';
import styles from './style';
import { screenHeight } from './constants';

const propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  websiteToken: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  withModal: PropTypes.bool,
  cwCookie: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    email: PropTypes.string,
    identifier_hash: PropTypes.string,
  }),
  locale: PropTypes.string,
  colorScheme: PropTypes.oneOf(['dark', 'light', 'auto']),
  customAttributes: PropTypes.shape({}),
  closeModal: PropTypes.func,
  onMessage: PropTypes.func,
};

const defaultProps = {
  cwCookie: '',
  user: {},
  locale: 'en',
  colorScheme: 'light',
  customAttributes: {},
};

const ChatWootWidget = ({
  isModalVisible,
  baseUrl,
  websiteToken,
  user,
  locale,
  colorScheme,
  customAttributes,
  closeModal,
  onMessage,
  withModal,
}) => {
  const [cwCookie, setCookie] = useState('');

  useEffect(() => {
    async function fetchData() {
      const value = await storeHelper.getCookie();
      setCookie(value);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let backHandlerSubscription;
    if (isModalVisible) {
      backHandlerSubscription = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackPress
      );
    } else {
      backHandlerSubscription?.remove();
    }
    return () => {
      backHandlerSubscription?.remove();
    };
  }, [isModalVisible]);

  const handleBackPress = () => {
    closeModal()
    return true;
  };

  const appColorScheme = Appearance.getColorScheme();

  const { headerBackgroundColor, mainBackgroundColor } = findColors({
    colorScheme,
    appColorScheme,
  });

  const renderContentView = () => {
    return (
      <>
        <SafeAreaView style={[styles.headerView, { backgroundColor: headerBackgroundColor }]} />
        <SafeAreaView style={[styles.mainView, { backgroundColor: mainBackgroundColor }]}>
          <WebView
            websiteToken={websiteToken}
            cwCookie={cwCookie}
            user={user}
            baseUrl={baseUrl}
            locale={locale}
            colorScheme={colorScheme}
            customAttributes={customAttributes}
            closeModal={closeModal}
            onMessage={onMessage}
          />
        </SafeAreaView>
      </>
    )
  }

  if (withModal) {
    return (
      <Modal
        backdropColor={COLOR_WHITE}
        coverScreen
        isVisible={isModalVisible}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        style={styles.modal}>
        {renderContentView()}
      </Modal>
    )
  } else {
    return (
      <View
        style={[styles.container, { left: isModalVisible ? 0 : screenHeight * 2 }]}>
        {renderContentView()}
      </View>
    );
  }
};

ChatWootWidget.defaultProps = defaultProps;
ChatWootWidget.propTypes = propTypes;

export default ChatWootWidget;
