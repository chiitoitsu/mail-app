import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'

const { height, width } = Dimensions.get('window')

export default class Mail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sender: props.sender,
			date: props.date,
			title: props.title
		}
	}

	static propTypes = {
		sender: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired
	}

	_openMenu = () => {
		this._menu.open()
	}

	render() {
		const { sender, date, title } = this.state
		return (
			<TouchableOpacity style={styles.container} onLongPress={this._openMenu}>
				<Menu ref={ref => (this._menu = ref)}>
					<MenuTrigger />
					<MenuOptions>
						<MenuOption onSelect={() => alert(`Save`)} text='Save' />
						<MenuOption onSelect={() => alert(`Delete`)}>
							<Text style={{ color: 'red' }}>Delete</Text>
						</MenuOption>
						<MenuOption
							onSelect={() => alert(`Not called`)}
							disabled={true}
							text='Disabled'
						/>
					</MenuOptions>
				</Menu>
				<View style={styles.logo} />
				<View style={styles.column}>
					<View style={styles.row}>
						<Text style={styles.text}>{sender}</Text>
						<Text style={styles.text}>{date}</Text>
					</View>
					<Text style={styles.text}>제목 : {title}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

Mail.propTypes = {
	title: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 5,
		paddingVertical: 10,
		width: width - 50,
		alignItems: 'center',
		borderColor: 'black',
		borderBottomWidth: 1
	},
	logo: {
		width: 50,
		height: 50,
		marginLeft: 10,
		marginRight: 20,
		borderRadius: 100,
		borderColor: 'black',
		borderWidth: 2
	},
	column: {
		flex: 1,
		flexDirection: 'column'
	},
	row: {
		flex: 1,
		flexDirection: 'row'
	},
	text: {
		marginRight: 15,
		fontSize: 15
	}
})
