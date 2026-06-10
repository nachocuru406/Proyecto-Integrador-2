import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Home from "../Screens/Home";
import NuevoPost from "../Screens/NuevoPost";

const Tab = createBottomTabNavigator();

function NavegacionTab(params) {
    return(
     <Tab.Navigator screenOptions={ { tabBarShowLabel: false } }>
        <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: () => <FontAwesome name='Home' size={24} color="black"/> }}/>
        <Tab.Screen name='NuevoPost' component={NuevoPost} options={{ tabBarIcon: () => <FontAwesome name='NuevoPost' size={24} color="black"/> }}/>
      </Tab.Navigator>
    )
}

export default NavegacionTab