import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import Mail from './Mail'

const { height, width } = Dimensions.get('window')

export default class TrashBox extends React.Component {
	state = {
		loadedTrashes: true
	}

	static propTypes = {
		trashBox: PropTypes.object.isRequired,
		setMail: PropTypes.func.isRequired,
		deleteAll: PropTypes.func.isRequired
	}

	render() {
		const { loadedTrashes } = this.state
		const { trashBox, setMail, deleteAll } = this.props

		if (!loadedTrashes) {
			return <AppLoading />
		}
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={deleteAll}>
					<Text style={styles.title}>휴지통</Text>
				</TouchableOpacity>

				<ScrollView style={styles.trashBox} contentContainerStyle={styles.mails}>
					{Object.values(trashBox).map(mail => (
						<Mail
							key={mail.id}
							id={mail.id}
							sender={mail.sender}
							date={mail.date}
							title={mail.title}
							isThrowed={mail.isThrowed}
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
	trashBox: {
		width: width - 25,
		borderColor: 'black',
		borderWidth: 1
	},
	mails: {
		alignItems: 'center'
	}
})
