import React, {Component} from 'react'
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Gravatar} from 'react-native-gravatar'

class Header extends Component {
	render() {
			return (
				<View style={styles.container}>
						<Icon name="bars" size={30} color="gray" onPress={ () => this.props.navigation.toggleDrawer() }/>
						<Text>Promobile</Text>
						{
							this.props.email ? 
							<Gravatar options={{email: this.props.email,secure: true}} style={styles.roundedProfileImage} /> 
							: <Button onPress={ () => this.props.navigation.navigate('Login') } title="Entrar" />
						}
				</View>
			)
		}
	}

var styles = StyleSheet.create({
		roundedProfileImage: {
			width:35 , height:35, borderWidth:3,
			borderColor:'gray', borderRadius:50
		},
		container: {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
				backgroundColor: '#eee',
				paddingHorizontal: 10,
				paddingVertical: 5
		}
	})

export default Header