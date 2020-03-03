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
import MailScreen from './Mailscreen'
import MailAdd from './Mailadd'
import PostBox from './Postbox'

const { height, width } = Dimensions.get('window')

export default class App extends React.Component {
	state = {
		currentScreen: 'mailBox', // option, mailBox, mailAdd, postBox, trashBox
		boxList: ['mailBox', 'trashBox'],
		mailBox: {}, // 전체 메일
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
			const random = Math.floor(Math.random() * 3)
			const testName = ['나', '연어', '참치']

			const newMail = {
				[ID]: {
					id: ID,
					sender: testName[random],
					date: '2020.01.01',
					title: ID,
					curPos: 'mailBox',
					prevPos: 'mailBox'
				}
			}
			const newState = {
				...prevState,
				['mailBox']: {
					...prevState['mailBox'],
					...newMail
				}
			}
			this._saveBox('mailBox', newState['mailBox'])
			return { ...newState }
		})
	}

	_setMail = (id, pos, option) => {
		console.log(pos)
		if (option == 'throw') {
			// 버리기
			this.setState(prevState => {
				const throwedMail = {
					[id]: {
						...prevState[pos][id],
						curPos: 'trashBox',
						prevPos: pos
					}
				}
				const newState = {
					...prevState,
					['trashBox']: {
						...prevState['trashBox'],
						...throwedMail
					}
				}
				this._saveBox('trashBox', newState['trashBox'])
				return { ...newState }
			})
			this.setState(prevState => {
				const throwedBox = prevState[pos]
				delete throwedBox[id]

				const newState = {
					...prevState,
					...throwedBox
				}
				this._saveBox(pos, newState[pos])
				return { ...newState }
			})
		} else if (option == 'delete') {
			// 삭제하기
			this.setState(prevState => {
				const trashBox = prevState['trashBox']
				delete trashBox[id]

				const newState = {
					...prevState,
					...trashBox
				}
				this._saveBox('trashBox', newState['trashBox'])
				return { ...newState }
			})
		} else if (option == 'restore') {
			this.setState(prevState => {
				const prevBox = prevState.trashBox[id].prevPos
				const restoreMail = {
					[id]: {
						...prevState.trashBox[id],
						curPos: prevBox,
						prevPos: pos
					}
				}
				const newState = {
					...prevState,
					[prevBox]: {
						...prevState[prevBox],
						...restoreMail
					}
				}
				this._saveBox(prevBox, newState[prevBox])
				return { ...newState }
			})
			this.setState(prevState => {
				const trashBox = prevState['trashBox']
				delete trashBox[id]

				const newState = {
					...prevState,
					...trashBox
				}
				this._saveBox('trashBox', newState['trashBox'])
				return { ...newState }
			})
		} else if (option == 'store') {
		} else if (option == 'edit') {
		} else {
			// 에러 체크
			alert(`${option} is not exist`)
		}
	}

	_throwAll = () => {
		const mails = Object.keys(this.state.mailBox)
		mails.forEach(mailID => this._setMail(mailID, 'mailBox', 'throw'))
	}

	_deleteAll = () => {
		const mails = Object.keys(this.state.trashBox)
		mails.forEach(mailID => this._setMail(mailID, 'trashBox', 'delete'))
	}

	_saveBox = (boxID, box) => {
		AsyncStorage.setItem(boxID, JSON.stringify(box))
	}

	_loadMail = async () => {
		try {
			const state = this.state
			const boxList = this.state.boxList

			for (let i in state) {
				for (let j in boxList) {
					// 리스트에 있는 보관함일 경우
					if (i == boxList[j]) {
						const boxID = i
						const box = await AsyncStorage.getItem(boxID)
						const parsedBox = JSON.parse(box)

						this.setState(prevState => {
							const newState = {
								...prevState,
								[boxID]: parsedBox || {}
							}
							return { ...newState }
						})
					}
				}
			}
		} catch (err) {
			console.log(err)
		}
	}

	_addPostBox = (newPostBox, newMenu) => {
		this.setState(prevState => {
			const newState = {
				...prevState,
				...newPostBox,
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
		const { currentScreen, mailBox, trashBox, sideMenu } = this.state

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
								<MailScreen
									id={currentScreen}
									title='전체 메일'
									screen={mailBox}
									setMail={this._setMail}
									clearAll={this._throwAll}
								/>
							)
						else if (currentScreen == 'mailAdd') return <MailAdd />
						else if (currentScreen == 'postBox')
							return <PostBox callback={this._addPostBox} />
						else if (currentScreen == 'trashBox')
							return (
								<MailScreen
									id={currentScreen}
									title='휴지통'
									screen={trashBox}
									setMail={this._setMail}
									clearAll={this._deleteAll}
								/>
							)
						else if (typeof this.state[currentScreen] == 'object')
							return (
								<MailScreen
									id={currentScreen}
									title={currentScreen}
									screen={this.state[currentScreen]}
									setMail={this._setMail}
									clearAll={() => {}}
								/>
							)
						else
							return (
								<View>
									<Text>{currentScreen} is not defined</Text>
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
