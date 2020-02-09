import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import Mail from './Mail'

const { height, width } = Dimensions.get('window')

export default class MailBox extends React.Component {
	state = {
		loadedMails: true
	}

	render() {
		const { loadedMails } = this.state

		if (!loadedMails) {
			return <AppLoading />
		}
		return (
			<View style={styles.container}>
				<Text style={styles.title}>전체 메일</Text>

				<ScrollView style={styles.mailBox} contentContainerStyle={styles.mails}>
					<Mail sender='나' date='2020.02.09' title='연어 먹고싶다' />
					<Mail sender='고기' date='2020.02.10' title='참치도 먹고싶다' />
					<Mail sender='감자' date='2020.02.11' title='킹무튼 해산물이 먹고싶다' />
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
