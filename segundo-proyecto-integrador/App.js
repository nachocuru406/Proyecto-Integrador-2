import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './src/Screens/Register';
import Login from './src/Screens/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name='Register' component={Register} />
        <Stack.Screen name='Login' component={Login} options={{headerBackVisible: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}