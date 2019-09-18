import React from 'react'
import Header from '../components/Header'
import {
    View,
    AsyncStorage,
    Button
  } from 'react-native'

class Account extends React.Component {
  state = {
    clienteLogado: []
  } 

  componentWillMount = async () => {
    await this.retrieveClienteLogado()
  }

  componentDidUpdate = async (prevProps, prevState)  => {     
    await this.retrieveClienteLogado(prevState)
  } 
  
  retrieveClienteLogado = async (prevState) => {
    try {
        const value = await AsyncStorage.getItem('signin');
        if (value) {
        if (prevState) {
            if (value.id !== prevState.clienteLogado.id) {        
                this.setState({clienteLogado: JSON.parse(value)})  
            }
          } else {
            this.setState({clienteLogado: JSON.parse(value)}) 
          }
        } else {
          this.setState({clienteLogado: []})
        }
      } catch (error) {
        alert(error)
      }
  }

    signout = async () => {
        await AsyncStorage.removeItem('signin')
        this.props.navigation.navigate('Feed')
    }
    
    render() {
    return (
        <View>
          <Header navigation={this.props.navigation } email={this.state.clienteLogado.email}/>
          <Button onPress={ () => {this.signout()} } title="Sair" />
        </View>
    )
  }
}

export default Account;
