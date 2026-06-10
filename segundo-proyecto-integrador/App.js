import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './src/Screens/Register';
import Login from './src/Screens/Login';
import Home from './src/Screens/Home';
import NuevoPost from './src/Screens/NuevoPost';
import Usuarios from './src/Screens/Usuarios';
import NavegacionTab from './src/Components/NavegacionTab';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Login' component={Login} options={{headerBackVisible: false}}/>
        <Stack.Screen name='NavegacionTab' component={NavegacionTab}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}