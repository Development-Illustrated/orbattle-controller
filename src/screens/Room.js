import React from 'react'

import {
	TextInput,
	Text,
	ImageBackground,
	Button,
	View
} from 'react-native'

import {
	Container
} from '../components/Container'
import { Controller } from '.';

const style = {
	inputContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 16
	},
	text: {
		color: 'white',
		paddingBottom: 8,
		fontSize: 16
	},
	backgroundStyle: {
		width: '100%',
		height: '100%',
		flex: 1
	},
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		width: '100%',
		backgroundColor: 'white',
		paddingLeft: 20,
		marginTop: 8
	}
}

class Room extends React.Component {
	constructor () {
		super()
		this.state = {
			roomCode: '',
			username: '',
			connected: false
		}
	}

	_enterRoom () {
		// submit room code to server
		if (this.state.username && this.state.roomCode) {
			this.setState({
				connected: true
			})
		}
	}

	render () {
		if (!this.state.connected) {
			return (
				<Container>
					<ImageBackground
						source={require('../../assets/scratched-metal.jpg')}
						style={style.backgroundStyle}
						imageStyle={{resizeMode: 'stretch'}}
						resizeMode="stretch"
					>
						<View style={[style.inputContainer]}>
							<Text style={style.text}>Please enter a username and a room code to join a game</Text>
							<TextInput
								underlineColorAndroid="transparent"
								style={style.textInput}
								onChangeText={(text) => this.setState({ username: text })}
								value={this.state.username}
								placeholder="Enter username"
								maxLength={8}
							/>
							<TextInput
								underlineColorAndroid="transparent"
								style={style.textInput}
								onChangeText={(text) => this.setState({ roomCode: text })}
								value={this.state.roomCode}
								placeholder="Enter room code"
							/>
							<Button
								onPress={() => this._enterRoom()}
								title="Enter"
								color="#fff"
							/>
						</View>
					</ImageBackground>
				</Container>
			)
		}

		return <Controller username={ this.state.username } />
	}
}

export default Room
