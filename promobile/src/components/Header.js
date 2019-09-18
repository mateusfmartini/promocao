import React, {Component} from 'react'
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Gravatar} from 'react-native-gravatar'

const Header = props => {
		return (
				<View style={styles.container}>
						<Icon name="bars" size={30} color="gray" onPress={ () => props.navigation.toggleDrawer() }/>
						<Text>Promobile</Text>
						{
							props.email ? 
							<Gravatar options={{email: props.email,secure: true}} style={styles.roundedProfileImage} /> 
							: <Button onPress={ () => props.navigation.navigate('Login') } title="Entrar" />
						}
				</View>
		)
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