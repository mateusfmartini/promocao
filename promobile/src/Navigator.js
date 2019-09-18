import { createDrawerNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'
import Feed from './screens/Feed'
import Account from './screens/Account'
import Login from './screens/Login'

const DrawerNavigator = createDrawerNavigator(
    {
      Feed: {
		screen: Feed,
		navigationOptions: {
			title: `Promoções`,
		  },
      },
      Account: {
		screen: Account,
		navigationOptions: {
			title: `Minha conta`,
		  },
      }
    },
    {
		initialRouteName: 'Feed',
		drawerType: 'front',
    }
  )

  const finalNavigator = createSwitchNavigator(
    {
      DrawerNavigator,
      Login
    }
  )
  
  export default createAppContainer(finalNavigator);