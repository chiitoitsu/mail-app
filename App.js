import React from 'react'
import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	ScrollView,
	Dimensions,
	TouchableOpacity
} from 'react-native'
import Drawer from 'react-native-drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons'
// https://expo.github.io/vector-icons/
import Menu from './Menu'
import Mail from './Mail'

const { height, width } = Dimensions.get('window')

export default class App extends React.Component {
	closeControlPanel = () => {
		this._drawer.close()
	}
	openControlPanel = () => {
		this._drawer.open()
	}
	render() {
		return (
			<Drawer
				ref={ref => (this._drawer = ref)}
				type='overlay'
				side='left'
				content={<Menu />}
				tapToClose={true}
				openDrawerOffset={0.5} // 50% gap on the right side of drawer
				panOpenMask={0.5}
				negotiatePan={true}
				tweenHandler={ratio => ({
					main: { opacity: (2 - ratio) / 2 }
				})}
			>
				<View style={styles.container}>
					<StatusBar hidden={true} />

					<TouchableOpacity onPress={() => this.openControlPanel()}>
						<Text style={styles.title}>전체 메일</Text>
					</TouchableOpacity>
					<ScrollView style={styles.mailBox} contentContainerStyle={styles.mails}>
						<Mail title='연어 먹고싶다' />
						<Mail title='참치도 먹고싶다' />
						<Mail title='킹무튼 해산물이 먹고싶다' />
					</ScrollView>
				</View>
			</Drawer>
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
