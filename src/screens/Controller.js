import React from 'react'

import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image
} from 'react-native'

import { Constants } from 'expo'

import {
  Container
} from '../components/Container'
const styles = {
  text: {
    color: 'black',
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
    this.state = {
      firing: false,
      turningLeft: false,
      turningRight: true
    }
  }

  render () {
    let baseControls = require('../../assets/unpress-left-right-button.png')
    let baseFire = require('../../assets/unpress-red-button.png')
    let turningLeft = require('../../assets/press-left-button.png')
    let turningRight = require('../../assets/press-right-button.png')
    let turningSomeWhere = require('../../assets/press-left-right-button.png')
    let firing = require('../../assets/pressed-red-button.png')

    let fireAllWeapons = this.state.firing ? firing : baseFire

    let movingAllOverTheWorld
    if (this.state.turningLeft && this.state.turningRight) movingAllOverTheWorld = turningSomeWhere
    else if (this.state.turningLeft) movingAllOverTheWorld = turningLeft
    else if (this.state.turningRight) movingAllOverTheWorld = turningRight
    else movingAllOverTheWorld = baseControls


    return (
      <Container>
        <ImageBackground
          source={require('../../assets/scratched-metal.jpg')}
          style={{width: '100%', height: '100%', flex: 1}}
          imageStyle={{resizeMode: 'stretch'}}
          resizeMode="stretch"
        >
          <View style={{ flex: 1 }}
            onMoveShouldSetResponder={() => true}
            onResponderRelease={() => this.releaseController()}
            onResponderMove={(evt) => this.moveAndMurder(evt)}
          >
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ width: '100%', height: '50%' }}>
                  <Image source={ movingAllOverTheWorld } style={{ width: '100%', height: '100%', transform: [{ rotate: '90deg'}] }}/>
                </View>
                <View style={{ width: '100%', height: '50%' }}>
                  <Image source={ fireAllWeapons } style={{ width: '100%', height: '100%', transform: [{ rotate: '90deg'}] }} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    )
  }

  moveAndMurder ({ nativeEvent }) {
    if (nativeEvent.pageY < LEFT) {
      this.sendRequest('LEFT')
      this.setState({
        turningLeft: true
      })
    } else if (nativeEvent.pageY > LEFT && nativeEvent.pageY < RIGHT) {
      this.sendRequest('RIGHT')
      this.setState({
        turningRight: true
      })
    } else if (nativeEvent.pageY > RIGHT) {
      this.sendRequest('FIRE')
      this.setState({
        firing: true
      })
    }
  }

  releaseController () {
    this.setState({
      turningLeft: false,
      turningRight: false,
      firing: false
    })
    return true
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
