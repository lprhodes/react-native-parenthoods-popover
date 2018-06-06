'use strict';

import autobind from 'autobind-decorator'
import * as Animatable from 'react-native-animatable'
import React, { PureComponent } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

Animatable.initializeRegistryWithDefinitions({
  popoverMenuAnimation: {
    '0': {
      opacity: 0,
      scale: 0.5,
    },
    '0.65': {
      scale: 1.08,
    },
    '1': {
      opacity: 1,
      scale: 1,
    },
  }
});

class Popover extends PureComponent {

  @autobind
  onClosePress () {
    if (this.props.onClose) this.props.onClose()
  }

  render () {
    const { isVisible, rect, backgroundColor } = this.props

    if (!isVisible) return null

    const widthStyle = { }
    let positionStyle = { top: rect.top }

    if (rect.left) {
      positionStyle.left = rect.left
    } else {
      positionStyle.right = rect.right || 8
    }

    const backgroundColorStyle = backgroundColor ? { backgroundColor } : null

    return (
      <TouchableWithoutFeedback onPress={this.onClosePress} style={{ zIndex: 800, }}>
        <View style={[ styles.container ]}>
          <Animatable.View animation="popoverMenuAnimation" duration={300} style={[ styles.content, widthStyle, positionStyle ]} ref="menu">
            <View style={[ styles.contentInner, backgroundColorStyle ]}>
              {this.props.children}
            </View>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    opacity: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: ScreenSize.height,
    width: ScreenSize.width,
    position: 'absolute',
    zIndex: 801,
    flexDirection: 'row'
  },
  
  content: {
    backgroundColor: 'transparent',
    zIndex: 101,
    position: 'absolute'
  },
  
  contentInner: {
    borderRadius: 5,
    paddingVertical: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    zIndex: 102,
  }
})

module.exports = Popover
