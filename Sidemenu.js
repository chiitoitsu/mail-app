import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import uuidv1 from 'uuid/v1'

const { height, width } = Dimensions.get('window')

export default class SideMenu extends React.Component {
	state = {
		sideMenu: {
			mailBox: {
				text: '전체 메일',
				screen: 'mailBox'
			},
			mailAdd: {
				text: '메일 추가',
				screen: 'mailAdd'
			},
			postBox: {
				text: '보관함 추가',
				screen: 'postBox'
			},
			trashBox: {
				text: '휴지통',
				screen: 'trashBox'
			}
		}
	}

	static propTypes = {
		callback: PropTypes.func.isRequired
	}

	_addMenu = () => {
		this.setState(prevState => {
			const ID = uuidv1()
			const newMenu = {
				[ID]: {
					text: '새 메뉴',
					screen: ID
				}
			}
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

	render() {
		const { sideMenu } = this.state
		const { callback } = this.props

		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => callback('option')}>
					<Text style={styles.title}>
						<MaterialCommunityIcons color='black' size={30} name={'settings-outline'} />
						설정
					</Text>
				</TouchableOpacity>
				{Object.values(sideMenu).map(item => (
					<Item text={item.text} screen={item.screen} callback={callback} />
				))}
				<TouchableOpacity onPress={this._addMenu}>
					<Text style={styles.items}>메뉴 추가</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

function Item({ text, screen, callback }) {
	return (
		<TouchableOpacity onPress={() => callback(screen)}>
			<Text style={styles.items}>{text}</Text>
		</TouchableOpacity>
	)
}

Item.propTypes = {
	text: PropTypes.string.isRequired,
	screen: PropTypes.string.isRequired,
	callback: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
	},
	title: {
		fontSize: 30,
		marginTop: 10,
		marginBottom: 30,
		paddingVertical: 10,
		borderColor: 'black',
		borderBottomWidth: 1
	},
	items: {
		fontSize: 20,
		margin: 10,
		padding: 5,
		width: 120,
		textAlign: 'center',
		borderColor: 'black',
		borderWidth: 1
	}
})
