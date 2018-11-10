import React from 'react'
import {
  SafeAreaView,
  View
} from 'react-native'

const styles = {
  container: {
    flex: 0,
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff'
  }
}

const Container = (props) =>
  <SafeAreaView style={[styles.SafeAreaView, props.safeAreaStyle]}>
    <View
      style={[styles.container, props.style]}
      onMoveShouldSetResponder={props.onMoveShouldSetResponder}
      onResponderRelease={props.onResponderRelease}
      onResponderMove={props.onResponderMove}
    >
      {props.children}
    </View>
  </SafeAreaView>

export default Container
