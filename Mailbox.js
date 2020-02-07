import React from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Mail from './Mail'

const { height, width } = Dimensions.get('window')

export default class MailBox extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>전체 메일</Text>

				<ScrollView style={styles.mailBox} contentContainerStyle={styles.mails}>
					<Mail title='연어 먹고싶다' />
					<Mail title='참치도 먹고싶다' />
					<Mail title='킹무튼 해산물이 먹고싶다' />
				</ScrollView>
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
	mailBox: {
		width: width - 25,
		borderColor: 'black',
		borderWidth: 1
	},
	mails: {
		alignItems: 'center'
	}
})
