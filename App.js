import React from 'react'
import { StyleSheet, Text, View, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import Drawer from 'react-native-drawer'
import { MenuProvider } from 'react-native-popup-menu'
import uuidv1 from 'uuid/v1'
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
		trashBox: {
			[111]: {
				id: '111',
				sender: 'asdf',
				date: '123123',
				title: 'asdf'
			}
		} // 휴지통
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

	_throwMail = throwedMail => {
		if (throwedMail != '') {
			this.setState(prevState => {
				const newState = {
					...prevState,
					trashBox: {
						...prevState.trashBox,
						throwedMail
					}
				}
				return { ...newState }
			})
		}
	}

	_addMail = () => {
		this.setState(prevState => {
			const ID = uuidv1()
			const newMail = {
				[ID]: {
					id: ID,
					sender: '나',
					date: '2020.01.01',
					title: '메일'
				}
			}
			const newState = {
				...prevState,
				mailBox: {
					...prevState.mailBox,
					...newMail
				}
			}
			return { ...newState }
		})
	}

	_setMail = (id, option) => {
		if (option == 'throw') {
			// 버리기 (휴지통으로 들어가는 기능 미구현)
			this.setState(prevState => {
				const mailBox = prevState.mailBox
				delete mailBox[id]

				const newState = {
					...prevState,
					...mailBox
				}

				return { ...newState }
			})
		} else if (option == 'delete') {
			// 삭제하기
			this.setState(prevState => {
				const trashBox = prevState.trashBox
				delete trashBox[id]

				const newState = {
					...prevState,
					...trashBox
				}

				return { ...newState }
			})
		} else {
			// 에러 체크
			alert(`${option} is not exist`)
		}
	}

	render() {
		const { currentScreen, mailBox, postBox, trashBox } = this.state

		return (
			<MenuProvider>
				<TouchableOpacity onPress={this._addMail}>
					<Text style={{ textAlign: 'center' }}>메일추가 (테스트용)</Text>
				</TouchableOpacity>
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
						if (currentScreen == 'mailBox')
							return <MailBox mailBox={mailBox} setMail={this._setMail} />
						else if (currentScreen == 'mailAdd') return <MailAdd />
						else if (currentScreen == 'trashBox')
							return <TrashBox trashBox={trashBox} setMail={this._setMail} />
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
