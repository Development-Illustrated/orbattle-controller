import React from 'react'
import config from '../config'

import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity
} from 'react-native'

import { Constants } from 'expo'

import {
  Container
} from '../components/Container'

const WINDOW_HEIGHT = Dimensions.get('window').height
const LEFT = WINDOW_HEIGHT / 4
const RIGHT = WINDOW_HEIGHT * 0.5
const baseControls = require('../../assets/unpress-left-right-button.png')
const baseFire = require('../../assets/unpress-red-button.png')
const turningLeft = require('../../assets/press-left-button.png')
const turningRight = require('../../assets/press-right-button.png')
const turningSomeWhere = require('../../assets/press-left-right-button.png')
const firing = require('../../assets/pressed-red-button.png')

const style = {
  buttonHandler: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '90deg' }]
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  controllerContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  rotate: {
    transform: [{ rotate: '90deg' }]
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

    let movingAllOverTheWorld
    if (this.state.turningLeft && this.state.turningRight) movingAllOverTheWorld = turningSomeWhere
    else if (this.state.turningLeft) movingAllOverTheWorld = turningLeft
    else if (this.state.turningRight) movingAllOverTheWorld = turningRight
    else movingAllOverTheWorld = baseControls

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
              <View style={style.imageContainer}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'red' }}
                  onPressIn={() => this.sendRequest('LEFT_START')}
                  onPressOut={() => this.sendRequest('RESET')}>
                  <Text>Lext</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'blue' }}
                  onPressIn={() => this.sendRequest('RIGHT_START')}
                  onPressOut={() => this.sendRequest('RESET')}>
                  <Text>Lext</Text>
                </TouchableOpacity>
              </View>
              <View style={style.imageContainer}>
                <TouchableOpacity onPress={() => this.sendRequest('FIRE')}>
                  <Image source={fireAllWeapons} style={style.buttonHandler} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    )
  }

  moveAndMurder ({ nativeEvent }) {
    if (nativeEvent.pageY < LEFT) {
      if (!this.state.turningLeft) {
        this.setState({
          turningLeft: true
        })
      }
      this.sendRequest('LEFT')
    } else if (nativeEvent.pageY > LEFT && nativeEvent.pageY < RIGHT) {
      if (!this.state.turningRight) {
        this.setState({
          turningRight: true
        })
      }
      this.sendRequest('RIGHT')
    } else if (nativeEvent.pageY > RIGHT) {
      if (!this.state.firing) {
        this.setState({
          firing: true
        })
      }
      this.sendRequest('FIRE')
    }
  }

  releaseController () {
    this.sendRequest('RESET')

    this.setState({
      turningLeft: false,
      turningRight: false,
      firing: false
    })
    return true
  }

  sendRequest (type) {
    let body = {
      ClientId: `${Constants.deviceId}`,
      RoomId: this.props.room,
      Command: type
    }

    this.ws.send(JSON.stringify(body))
  }
}

export default Controller
