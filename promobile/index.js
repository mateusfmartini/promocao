import {AppRegistry, YellowBox} from 'react-native'
import Navigator from './src/Navigator'
import {name as promobile} from './app.json'

YellowBox.ignoreWarnings([''])

AppRegistry.registerComponent(promobile, () => Navigator);
