import React, {Component} from 'react'
import {View, Alert, Text, Button, StyleSheet} from 'react-native'
import axios from 'axios'
import {baseApiUrl} from '../../global'

class Promocao extends Component {
    resgatarPromocao = async () => {
        if (!this.props.clienteLogadoId) {
          this.props.navigation.navigate('Login')
        } else {
            try {
                await axios.post(`${baseApiUrl}/promocoes/clientes`, {idpromocao: this.props.id, idcliente: this.props.clienteLogadoId})
                Alert.alert('Cupom resgatado',`Cupom ${this.props.codigo} resgatado com sucesso!`)
            } catch (err) {
                alert(err)
            }
        }
      }
    render() {
        return (
            <View style={styles.container} >
                <Text style={[styles.name, styles.marginBottom]}>{this.props.descricao}</Text>
                
                <Text style={[styles.marginVertical,styles.description]}>
                {this.props.descricaoDetalhada}
                </Text>
                
                <View style={[styles.marginVertical,styles.innerContainer]}>
                    <Text style={styles.percentage}>{parseFloat(this.props.percentual).toFixed(0)}%</Text>
                    <View style={styles.tagsContainer}>
                    { this.props.qtdFaltante ? <Text style={styles.tag}>{this.props.qtdFaltante} cupons disponíveis</Text> : null }
                    </View>
                </View>
                {
                    this.props.produtos.map(produto => {
                        return <Text style={[styles.marginVertical,styles.products]}>{produto.quantidade}x {produto.descricao}</Text>
                    })
                }
                    <Text style={[styles.marginVertical,styles.priceLabel]}>De <Text style={styles.priceBefore}>R${parseFloat(this.props.precoTotal).toFixed(2)}</Text> por <Text style={styles.priceAfter}>R${parseFloat(this.props.precoComDesconto).toFixed(2)}</Text></Text>
                <View style={[styles.marginTop,styles.end]}>
                    <Text style={styles.company}>{this.props.nomeFornecedor}</Text>
                { this.props.qtdFaltante||this.props.qtdFaltante==NaN ? 
                <Button style={styles.button} onPress={ () => {this.resgatarPromocao()} } title="Retirar promoção" /> 
                : <Text>Promoção Encerrada</Text> }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginTop: 15,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor:'#e6ebd8',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#bfa706'
    },
    description: {
    }, 
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    percentage: {
        flex: 2,
        textAlign:'center',
        color: '#3da156',
        fontSize: 40,
        fontWeight: 'bold'
    },
    tagsContainer: {
        alignItems:'center',
        justifyContent:'center',
        flex: 3
    },
    tag: {
        backgroundColor: '#fad946',
        borderRadius: 5,
        marginVertical: 3,
        paddingVertical:5,
        paddingHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 1,
    },
    products: {
        textAlign:'center',
    },
    priceLabel:{
        fontSize: 15,
        alignSelf: 'flex-end'
    },
    priceBefore: {
        textDecorationLine:'line-through',
        fontSize: 17
    },
    priceAfter:{
        fontWeight: 'bold',
        fontSize: 25,
        color:'#366a9c'
    },
    end:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    company: {
        flex: 1,
    },
    button: {
        flex: 1
    },
    marginVertical: {
        marginVertical: 3
    },
    marginBottom: {
        marginBottom: 3
    },
    marginTop: {
        marginTop: 3
    }
})

export default Promocao
