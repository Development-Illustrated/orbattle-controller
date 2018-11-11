import React from 'react'
import config from '../config'

import {
  View,
  Dimensions,
  ImageBackground,
  Image,
  TouchableWithoutFeedback
} from 'react-native'

import { Constants } from 'expo'

import {
  Container
} from '../components/Container'

const WINDOW_HEIGHT = Dimensions.get('window').height
const baseLeft = require('../../assets/unpress-left-button.png')
const baseRight = require('../../assets/unpress-right-button.png')
const baseFire = require('../../assets/unpress-red-button.png')
const turningLeft = require('../../assets/pressed-left-button.png')
const turningRight = require('../../assets/pressed-right-button.png')
const firing = require('../../assets/pressed-red-button.png')

const style = {
  buttonHandler: {
    width: '100%',
    height: '100%',
    transform: [{ scale: 0.85}, { rotate: '90deg' }]
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftImageContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  controllerContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  rotate: {
    transform: [{ rotate: '90deg' }]
  },
  turnButtons: {
    width: '100%',
    height: '100%',
  }
}

class Controller extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      firing: false,
      turningLeft: false,
      turningRight: false
    }

    this.ws = new WebSocket(`${config.socketUrl}`)
  }

  render () {
    let fireAllWeapons = this.state.firing ? firing : baseFire
    let turnLeft = this.state.turningLeft ? turningLeft : baseLeft
    let turnRight = this.state.turningRight ? turningRight : baseRight

    return (
      <Container>
        <ImageBackground
          source={require('../../assets/scratched-metal.jpg')}
          style={style.backgroundImage}
          imageStyle={{ resizeMode: 'stretch' }}
          resizeMode='stretch'
        >
          <View style={{ flex: 1 }}>
            <View style={style.controllerContainer}>
              <View style={[style.leftImageContainer]}>
                <View style={{ height: '50%', width: '100%', flex: 1 }}>
                  <TouchableWithoutFeedback
                    style={{ flex: 0, height: '50%', backgroundColor: 'red' }}
                    onPressIn={() => this.sendRequest('LEFT_START')}
                    onPressOut={() => this.sendRequest('RESET')}>
                    <Image source={turnLeft} style={style.turnButtons} resizeMode="contain" />
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ height: '50%', width: '100%', flex: 1 }}>
                  <TouchableWithoutFeedback
                    style={{ flex: 0, height: '50%', backgroundColor: 'red' }}
                    onPressIn={() => this.sendRequest('RIGHT_START')}
                    onPressOut={() => this.sendRequest('RESET')}>
                    <Image source={turnRight} style={style.turnButtons} resizeMode="contain"  />
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={style.imageContainer}>
                <TouchableWithoutFeedback
                    onPressIn={() => this.sendRequest('FIRE')}
                    onPressOut={() => this.sendRequest('RESET')}>
                  <Image source={fireAllWeapons} style={style.buttonHandler} />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    )
  }

  sendRequest (type) {
    switch (type) {
      case 'LEFT_START':
        this.setState({
          turningLeft: true
        })
        break
      case 'RIGHT_START':
        this.setState({
          turningRight: true
        })
        break
      case 'FIRE':
        this.setState({
          firing: true
        })
        break
      case 'RESET':
      default:
        this.setState({
          turningLeft: false,
          turningRight: false,
          firing: false
        })
        break
    }
    let body = {
      ClientId: `${Constants.deviceId}`,
      RoomId: this.props.room,
      Command: type
    }

    this.ws.send(JSON.stringify(body))
  }
}

export default Controller
