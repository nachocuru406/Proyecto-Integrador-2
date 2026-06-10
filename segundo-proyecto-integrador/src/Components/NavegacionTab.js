import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5, Entypo }from '@expo/vector-icons';
import React from "react";
import Home from "../Screens/Home";
import NuevoPost from "../Screens/NuevoPost";
import Perfil from "../Screens/Perfil"

const Tab = createBottomTabNavigator();

export default function NavegacionTab(params) {
    return(
     <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
        <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" /> }}/>
        <Tab.Screen name='NuevoPost' component={NuevoPost} options={{ tabBarIcon: () => <Entypo name="squared-plus" size={24} color="black" /> }}/>
        <Tab.Screen name='Perfil' component={Perfil} options={{ tabBarIcon: () => <FontAwesome5 name="user-alt" size={24} color="black" /> }}/>
      </Tab.Navigator>
    )
}