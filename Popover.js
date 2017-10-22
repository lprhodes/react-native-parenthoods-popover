'use strict';

import autobind from 'autobind-decorator'
import * as Animatable from 'react-native-animatable'
import ElevatedView from 'fiber-react-native-elevated-view'
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback,
  View,
  Easing,
  findNodeHandle
} from 'react-native';

var noop = () => {};

var {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
var DEFAULT_ARROW_SIZE = new Size(10, 5);

function Point(x, y) {
  this.x = x;
  this.y = y;
}

function Size(width, height) {
  this.width = width;
  this.height = height;
}

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

class Popover extends PureComponent {

  @autobind
  onClosePress () {
    if (this.props.onClose) this.props.onClose()
  }

  render () {
    const { displayArea, isVisible, rect } = this.props

    if (!isVisible) {
      return null;
    }

    const widthStyle = { }

    let positionStyle = !this.props.ignoreContentPosition ? (((rect.y + 180) > ScreenSize.contentHeight - 80) ? { top: rect.y - 160 - 4 } : { top: rect.y + 8 }) : { top: rect.y + 8 }

    if (rect.left) {
      positionStyle.left = rect.left
    } else {
      positionStyle.right = rect.right || 8
    }

    return (
      <TouchableWithoutFeedback onPress={this.onClosePress} style={{ zIndex: 800, }}>
        <View style={[ styles.container ]}>
          <Animatable.View animation="mainMenuButtonAnimation" duration={300} style={[ styles.content, widthStyle, positionStyle ]} ref="menu">
            <View
              style={styles.contentInner}
            >
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
      backgroundColor: GlobalStyles().backgroundColor,
      paddingVertical: 2,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 4,
      shadowOpacity: 0.1,
      zIndex: 102,
    }
});

module.exports = Popover;
