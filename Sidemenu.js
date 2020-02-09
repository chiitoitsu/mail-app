import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { height, width } = Dimensions.get('window')

export default function SideMenu({ callback }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => callback('option')}>
				<Text style={styles.title}>
					<MaterialCommunityIcons color='black' size={30} name={'settings-outline'} />
					설정
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('mailBox')}>
				<Text style={styles.items}>전체 메일</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('mailAdd')}>
				<Text style={styles.items}>메일 추가</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('postBox')}>
				<Text style={styles.items}>보관함 추가</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('trashBox')}>
				<Text style={styles.items}>휴지통</Text>
			</TouchableOpacity>
		</View>
	)
}

SideMenu.propTypes = {
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
