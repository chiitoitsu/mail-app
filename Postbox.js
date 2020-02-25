import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import uuidv1 from 'uuid/v1'

const { height, width } = Dimensions.get('window')

export default class PostBox extends React.Component {
	state = {
		selectedIcon: ''
	}

	static propTypes = {
		callback: PropTypes.func.isRequired
	}

	_returnPostBox = () => {
		if (this.state.selectedIcon != '') {
			const ID = uuidv1()
			const newPostBox = {
				[ID]: {
					text: '새 보관함',
					screen: ID,
					icon: this.state.selectedIcon
				}
			}
			this.props.callback(newPostBox)
			this.setState({ selectedIcon: '' })
		}
	}

	render() {
		const { selectedIcon } = this.state
		const { addPostBox } = this.props

		return (
			<View style={styles.container}>
				<Text style={styles.title}>보관함 추가</Text>

				<View style={styles.postBox}>
					<Text style={styles.subtitle}>아이콘 선택</Text>
					<View style={styles.icons}>
						<TouchableOpacity onPress={() => this.setState({ selectedIcon: 'gmail' })}>
							<MaterialCommunityIcons color='black' size={60} name={'gmail'} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.setState({ selectedIcon: 'discord' })}
						>
							<MaterialCommunityIcons color='black' size={60} name={'discord'} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => this.setState({ selectedIcon: 'briefcase' })}
						>
							<MaterialCommunityIcons color='black' size={60} name={'briefcase'} />
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={this._returnPostBox}>
						<Text style={styles.subtitle}>보관함 생성</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center'
		// justifyContent: 'center'
	},
	title: {
		fontSize: 30,
		marginTop: 10,
		marginBottom: 10,
		paddingVertical: 10,
		width: width - 25,
		textAlign: 'center',
		borderColor: 'black',
		borderWidth: 1
	},
	subtitle: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10,
		textAlign: 'center'
	},
	postBox: {
		width: width - 25,
		height: height - 100,
		borderColor: 'black',
		borderWidth: 1
	},
	icons: {
		display: 'flex',
		alignItems: 'center'
	}
})
