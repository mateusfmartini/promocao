import React, {Component, Fragment} from 'react'
import {StyleSheet, Button, View, TextInput, Text, AsyncStorage, TouchableHighlight, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { withNavigation } from 'react-navigation';
import {baseApiUrl} from '../../global'


class Login extends Component {
    state = {
        registrar: false,
        descricao: '',
        email: '',
        telefone: null,
        password: '',
        passwordConfirm: '',
    }

    signin = async () => {
        try {
            const resLogin = await axios.post(`${baseApiUrl}/clientes/signin`, this.state)
            try {
                
                await AsyncStorage.setItem('signin', JSON.stringify(resLogin.data))
                this.props.navigation.navigate('Feed')
              } catch (error) {
                alert(error)
              }

        } catch (error) {
            Alert.alert('',error.response.data)
        }
    }

    signup = async () => {
        try {
            await axios.post(`${baseApiUrl}/clientes`, this.state)
            Alert.alert('','Cadastro realizado com sucesso!')
            this.signin()
        } catch(err) {
            alert(err)
        }
    }
    
    render() {
        return (
            
        <View >
            <View style={styles.header}>
                <Icon style={styles.icon} name="arrow-left" size={20} color="blue" onPress={ () => this.props.navigation.navigate('Feed') } />
                {this.state.registrar ? <Text style={styles.headerText}>Crie uma nova conta</Text> : <Text style={styles.headerText}>Entre em sua conta</Text>}
                <View style={{width:20}}/>
            </View>
            <View style={styles.container}>
            {this.state.registrar ? <TextInput style={styles.text} onChangeText = { descricao => this.setState({descricao}) } placeholder="Nome" textContentType="givenName" /> : null}
            <TextInput style={styles.text} onChangeText = { email => this.setState({email}) } placeholder="E-mail" keyboardType="email-address" textContentType="emailAddress" />
            {this.state.registrar ? <TextInput style={styles.text} onChangeText = { telefone => this.setState({telefone}) } placeholder="Telefone" keyboardType="phone-pad" textContentType="telephoneNumber" /> : null}
            <TextInput style={styles.text} onChangeText = { password => this.setState({password}) } placeholder="Senha" keyboardType="visible-password" textContentType="password" />
            {this.state.registrar ? <TextInput style={styles.text} onChangeText = { passwordConfirm => this.setState({passwordConfirm}) } placeholder="Confimação de Senha" keyboardType="visible-password" textContentType="password" /> : null }
            {this.state.registrar ? <Button onPress={ () => {this.signup()} } title="Registrar-se" /> : <Button onPress={ () => {this.signin()} } title="Entrar" />}
            <TouchableHighlight style={styles.toggleText} onPress={() => {this.setState({registrar: !this.state.registrar})}}>
                {this.state.registrar ? <Text>Já tem uma conta?</Text> : <Text>Ainda não tem uma conta?</Text>}
            </TouchableHighlight>
            </View>
        </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        margin: 10
    },
    header: {
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
        marginLeft:5
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color:'#366a9c'
    },
    text: {
        marginVertical: 5,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 10,
        fontSize: 15,
    },
    input: {
        width: 150,
        borderBottomWidth: 0,
        marginBottom: 20,
    },
    toggleText: {
        marginTop: 5
    }
})

export default withNavigation(Login)