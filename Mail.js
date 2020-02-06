import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import PropTypes from 'prop-types'

const { height, width } = Dimensions.get('window')

export default function Mail({ title }) {
	return (
		<View style={styles.container}>
			<View style={styles.logo} />
			<View style={styles.column}>
				<View style={styles.row}>
					<Text style={styles.text}>나</Text>
					<Text style={styles.text}>2020.##.##</Text>
				</View>
				<Text style={styles.text}>제목 : {title}</Text>
			</View>
		</View>
	)
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
