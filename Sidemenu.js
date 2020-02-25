import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import uuidv1 from 'uuid/v1'

const { height, width } = Dimensions.get('window')

export default function SideMenu({ callback, sideMenu }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => callback('option')}>
				<Text style={styles.title}>
					<MaterialCommunityIcons color='black' size={30} name={'settings-outline'} />
					설정
				</Text>
			</TouchableOpacity>
			{Object.values(sideMenu).map(item => (
				<Item
					key={item.screen}
					text={item.text}
					screen={item.screen}
					icon={item.icon}
					callback={callback}
				/>
			))}
		</View>
	)
}

SideMenu.propTypes = {
	callback: PropTypes.func.isRequired,
	sideMenu: PropTypes.object.isRequired
}

function Item({ text, screen, icon, callback }) {
	return (
		<TouchableOpacity onPress={() => callback(screen)}>
			<Text style={styles.items}>
				<MaterialCommunityIcons color='black' size={20} name={icon} />
				{text}
			</Text>
		</TouchableOpacity>
	)
}

Item.propTypes = {
	text: PropTypes.string.isRequired,
	screen: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
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
		width: width / 3,
		textAlign: 'center',
		borderColor: 'black',
		borderWidth: 1
	}
})
