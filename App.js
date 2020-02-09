import React from 'react'
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native'
import Drawer from 'react-native-drawer'
import { MenuProvider } from 'react-native-popup-menu'
import { AppLoading } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// https://expo.github.io/vector-icons/
import SideMenu from './Sidemenu'
import MailBox from './Mailbox'
import MailAdd from './Mailadd'
import TrashBox from './Trashbox'

const { height, width } = Dimensions.get('window')

export default class App extends React.Component {
	state = {
		currentScreen: 'mailBox', // option, mailBox, mailAdd, postBox, trashBox
		mailBox: {}, // 전체 메일
		postBox: {}, // 메일 보관함
		trashBox: {} // 휴지통
	}

	_setScreen = dataFromChild => {
		this.setState({ currentScreen: dataFromChild })
		this._closeControlPanel()
	}

	_closeControlPanel = () => {
		this._drawer.close()
	}

	_openControlPanel = () => {
		this._drawer.open()
	}

	render() {
		const { currentScreen } = this.state

		return (
			<MenuProvider>
				<Drawer
					ref={ref => (this._drawer = ref)}
					type='overlay'
					side='left'
					content={<SideMenu callback={this._setScreen} />}
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
						else if (currentScreen == 'mailAdd') return <MailAdd />
						else if (currentScreen == 'trashBox') return <TrashBox />
						else
							return (
								<View>
									<Text>{currentScreen}</Text>
								</View>
							)
					})()}
				</Drawer>
			</MenuProvider>
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
