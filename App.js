import React from 'react'
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native'
import Drawer from 'react-native-drawer'
import { AppLoading } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// https://expo.github.io/vector-icons/
import Menu from './Menu'
import MailBox from './Mailbox'

const { height, width } = Dimensions.get('window')

export default class App extends React.Component {
	state = {
		loadedMails: true,
		currentScreen: 'mailBox', // option, mailBox, mailAdd, postBox, trashBox
		mailBox: {}, // 전체 메일
		postBox: {}, // 메일 보관함
		trashBox: {} // 휴지통
	}

	setScreen = dataFromChild => {
		this.setState({ currentScreen: dataFromChild })
	}

	closeControlPanel = () => {
		this._drawer.close()
	}

	openControlPanel = () => {
		this._drawer.open()
	}

	render() {
		const { loadedMails, currentScreen } = this.state
		if (!loadedMails) {
			return <AppLoading />
		}
		return (
			<Drawer
				ref={ref => (this._drawer = ref)}
				type='overlay'
				side='left'
				content={<Menu callback={this.setScreen} />}
				tapToClose={true}
				openDrawerOffset={0.5} // 50% gap on the right side of drawer
				panOpenMask={0.5}
				negotiatePan={true}
				tweenHandler={ratio => ({
					main: { opacity: (2 - ratio) / 2 }
				})}
			>
				<StatusBar hidden={true} />
				{(() => {
					if (currentScreen == 'mailBox') return <MailBox />
					else
						return (
							<View>
								<Text>{currentScreen}</Text>
							</View>
						)
				})()}
			</Drawer>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
		// justifyContent: 'center'
	}
})
