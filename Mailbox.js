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

	static propTypes = {
		mailBox: PropTypes.object.isRequired,
		setMail: PropTypes.func.isRequired
	}

	render() {
		const { loadedMails } = this.state
		const { mailBox, setMail } = this.props

		if (!loadedMails) {
			return <AppLoading />
		}
		return (
			<View style={styles.container}>
				<Text style={styles.title}>전체 메일</Text>

				<ScrollView style={styles.mailBox} contentContainerStyle={styles.mails}>
					{Object.values(mailBox).map(mail => (
						<Mail
							key={mail.id}
							id={mail.id}
							sender={mail.sender}
							date={mail.date}
							title={mail.title}
							callback={setMail}
						/>
					))}
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
