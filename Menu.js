import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { height, width } = Dimensions.get('window')

export default function Menu({ callback }) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => callback('option')}>
				<Text style={styles.title}>
					<MaterialCommunityIcons color='black' size={30} name={'settings-outline'} />
					설정
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('mailBox')}>
				<Text>전체 메일</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('mailAdd')}>
				<Text>메일 추가</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('postBox')}>
				<Text>보관함 추가</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => callback('trashBox')}>
				<Text>휴지통</Text>
			</TouchableOpacity>
		</View>
	)
}

Menu.propTypes = {
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
	}
})
