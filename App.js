import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Dimensions,
	TouchableOpacity,
	AsyncStorage
} from 'react-native'
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
import PostBox from './Postbox'

const { height, width } = Dimensions.get('window')

export default class App extends React.Component {
	state = {
		currentScreen: 'mailBox', // option, mailBox, mailAdd, postBox, trashBox
		mailBox: {}, // 전체 메일
		postBox: {}, // 메일 보관함
		trashBox: {}, // 휴지통
		sideMenu: {
			mailBox: {
				text: '전체 메일',
				screen: 'mailBox',
				icon: 'home-outline'
			},
			mailAdd: {
				text: '메일 추가',
				screen: 'mailAdd',
				icon: 'note-plus-outline'
			},
			postBox: {
				text: '보관함 추가',
				screen: 'postBox',
				icon: 'folder-multiple-outline'
			},
			trashBox: {
				text: '휴지통',
				screen: 'trashBox',
				icon: 'trash-can-outline'
			}
		}
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

	_addMail = () => {
		this.setState(prevState => {
			const ID = uuidv1()
			const newMail = {
				[ID]: {
					id: ID,
					sender: '나',
					date: '2020.01.01',
					title: ID,
					curPos: 'mailBox',
					prevPos: 'mailBox'
				}
			}
			const newState = {
				...prevState,
				mailBox: {
					...prevState.mailBox,
					...newMail
				}
			}
			this._saveMailBox(newState.mailBox)
			return { ...newState }
		})
	}

	_setMail = (id, option) => {
		console.log(option)
		if (option == 'throw') {
			// 버리기
			this.setState(prevState => {
				const throwedMail = {
					[id]: {
						...prevState.mailBox[id],
						curPos: 'trashBox'
					}
				}
				const newState = {
					...prevState,
					trashBox: {
						...prevState.trashBox,
						...throwedMail
					}
				}
				this._saveTrashBox(newState.trashBox)
				return { ...newState }
			})
			this.setState(prevState => {
				const mailBox = prevState.mailBox
				delete mailBox[id]

				const newState = {
					...prevState,
					...mailBox
				}
				this._saveMailBox(newState.mailBox)
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
				this._saveTrashBox(newState.trashBox)
				return { ...newState }
			})
		} else if (option == 'restore') {
			this.setState(prevState => {
				const restoreMail = {
					[id]: {
						...prevState.trashBox[id],
						curPos: 'mailBox'
					}
				}
				const newState = {
					...prevState,
					mailBox: {
						...prevState.mailBox,
						...restoreMail
					}
				}
				this._saveMailBox(newState.mailBox)
				return { ...newState }
			})
			this.setState(prevState => {
				const trashBox = prevState.trashBox
				delete trashBox[id]

				const newState = {
					...prevState,
					...trashBox
				}
				this._saveTrashBox(newState.trashBox)
				return { ...newState }
			})
		} else if (option == 'edit') {
		} else {
			// 에러 체크
			alert(`${option} is not exist`)
		}
	}

	_throwAll = () => {
		const mails = Object.keys(this.state.mailBox)
		mails.forEach(id => this._setMail(id, 'throw'))
	}

	_deleteAll = () => {
		const mails = Object.keys(this.state.trashBox)
		mails.forEach(id => this._setMail(id, 'delete'))
	}

	_saveMailBox = newMailBox => {
		const saveMailBox = AsyncStorage.setItem('mailBox', JSON.stringify(newMailBox))
	}

	_saveTrashBox = newTrashBox => {
		const saveTrashBox = AsyncStorage.setItem('trashBox', JSON.stringify(newTrashBox))
	}

	_loadMail = async () => {
		try {
			const mailBox = await AsyncStorage.getItem('mailBox')
			const trashBox = await AsyncStorage.getItem('trashBox')
			const parsedMailBox = JSON.parse(mailBox)
			const parsedTrashBox = JSON.parse(trashBox)
			this.setState({
				mailBox: parsedMailBox || {},
				trashBox: parsedTrashBox || {}
			})
		} catch (err) {
			console.log(err)
		}
	}

	_addPostBox = newMenu => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				sideMenu: {
					...prevState.sideMenu,
					...newMenu
				}
			}
			return { ...newState }
		})
	}

	componentDidMount = () => {
		this._loadMail()
	}

	render() {
		const { currentScreen, mailBox, postBox, trashBox, sideMenu } = this.state

		return (
			<MenuProvider>
				<TouchableOpacity onPress={this._addMail}>
					<Text style={{ textAlign: 'center' }}>메일추가 (테스트용)</Text>
				</TouchableOpacity>
				<Drawer
					ref={ref => (this._drawer = ref)}
					type='overlay'
					side='left'
					content={<SideMenu sideMenu={sideMenu} callback={this._setScreen} />}
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
							return (
								<MailBox
									mailBox={mailBox}
									setMail={this._setMail}
									throwAll={this._throwAll}
								/>
							)
						else if (currentScreen == 'mailAdd') return <MailAdd />
						else if (currentScreen == 'postBox')
							return <PostBox callback={this._addPostBox} />
						else if (currentScreen == 'trashBox')
							return (
								<TrashBox
									trashBox={trashBox}
									setMail={this._setMail}
									deleteAll={this._deleteAll}
								/>
							)
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
