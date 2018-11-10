import React from 'react'

import {
  View,
  Text,
  Dimensions
} from 'react-native'

import { Constants } from 'expo'

import {
  Container
} from '../components/Container'
const styles = {
  text: {
    color: '#FFF',
    textTransform: 'uppercase',
    transform: [{ rotate: '90deg' }]
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const WINDOW_HEIGHT = Dimensions.get('window').height
const LEFT = WINDOW_HEIGHT / 4
const RIGHT = WINDOW_HEIGHT * 0.5

class Controller extends React.Component {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    return (
      <Container>
        <View style={{ flex: 1 }}
          onMoveShouldSetResponder={() => true}
          onResponderRelease={() => true}
          onResponderMove={(evt) => this.moveAndMurder(evt)}
        >
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={[styles.textContainer, { backgroundColor: 'blue' }]}>
              <Text style={styles.text}>Left</Text>
            </View>
            <View style={[styles.textContainer, { backgroundColor: 'green' }]}>
              <Text style={styles.text}>Right</Text>
            </View>
          </View>
          <View style={[styles.textContainer, { backgroundColor: 'red' }]}>
            <Text style={styles.text}>Fire</Text>
          </View>
        </View>
      </Container>
    )
  }

  moveAndMurder ({ nativeEvent }) {
    if (nativeEvent.pageY < LEFT) {
      this.sendRequest('LEFT')
    } else if (nativeEvent.pageY > LEFT && nativeEvent.pageY < RIGHT) {
      this.sendRequest('RIGHT')
    } else if (nativeEvent.pageY > RIGHT) {
      this.sendRequest('FIRE')
    }
  }

  sendRequest (type) {
    let body = {
      ClientId: `cl-${Constants.deviceId}`,
      Command: type
    }

    fetch('http://192.168.1.117:6969/test', {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then(resp => console.log(resp))
      .catch(err => console.error(err))
  }
}

export default Controller
