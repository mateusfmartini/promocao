import React from 'react'
import {View, ScrollView, StyleSheet, AsyncStorage} from 'react-native'
import Header from '../components/Header'
import Promocao from '../components/Promocao'
import axios from 'axios'
import {baseApiUrl} from '../../global'

class Feed extends React.Component {
	state = {
        promocoes: [],
        clienteLogado: []
  }
  
  componentWillMount = async () => {
    await this.retrieveClienteLogado()
    await this.retrievePromocoes()
  }

  componentDidUpdate = async (prevProps, prevState)  => {     
      await this.retrieveClienteLogado(prevState)
  } 

  retrievePromocoes = async () => {
    try {
        const resPromocoes = await axios.get(`${baseApiUrl}/frontend/promocoes`)
        this.setState({ promocoes: resPromocoes.data })
    } catch (err) {
        alert(err)
    }
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

  render() {
    return (
      <View style={styles.container}>
        <Header navigation={this.props.navigation} email={this.state.clienteLogado.email}/>
        <ScrollView>
        {
            
            this.state.promocoes.map((promocao) => {
                return (
                    <Promocao 
                        navigation={this.props.navigation}
                        id={promocao.id}
                        descricao={promocao.descricao}
                        descricaoDetalhada={promocao.descricaodetalhada}
                        codigo={promocao.codigo}
                        percentual={promocao.percentual}
                        quantidadeMaxima={promocao.quantidademaxima} 
                        produtos={promocao.produtos}
                        precoTotal={promocao.precototal}
                        precoComDesconto={promocao.precocomdesconto}
                        nomeFornecedor={promocao.nomefornecedor}
                        clienteLogadoId={this.state.clienteLogado.id}
                        />
                )
            })
        }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Feed;
