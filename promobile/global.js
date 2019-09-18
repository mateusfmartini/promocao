export const baseApiUrl = 'http://179.177.119.112:8443'
import {AsyncStorage} from 'react-native';
import axios from 'axios'

export const validateToken = async () => {
    try {
        const value = await AsyncStorage.getItem('signin');
        if (value !== null) {
            const userData = JSON.parse(value)
        }
      } catch (error) {
        alert(error)
      }
    
    if(!userData) {
        return false
    }

    const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

    if (res.data) {
        await AsyncStorage.setItem('signin', resLogin)
        return true
    } else {
        await AsyncStorage.removeItem('signin')
        alert('Por favor, entre em sua conta novamente')
        return false
    }

}
