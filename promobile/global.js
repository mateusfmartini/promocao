export const baseApiUrl = 'http://192.168.15.3:4000'
import {AsyncStorage} from 'react-native';
import axios from 'axios'

export const validateToken = async () => {
    try {
        const value = await AsyncStorage.getItem('signin');
        if (value !== null) {
            const userData = JSON.parse(value)
            if(!userData) {
                return false
            }
        }
      } catch (error) {
        alert(error)
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
