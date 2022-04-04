import {useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "./Settings";
import Home from './Home';
import {getUserInfo} from "../functions/getUserInfo";
import Search from "./Search";
import {LogBox} from "react-native";
import Scanner from './Scanner';
import {ProductInfo} from "./ProductInfo";

const Stack = createNativeStackNavigator();

export default function HomeStack(props) {

    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home"
                          initialParams={props.route.params}
                          component={Home}/>
            <Stack.Screen name="Settings"
                          initialParams={props.route.params}
                          component={Settings}/>
            <Stack.Screen name="Search"
                          initialParams={Object.assign(props.route.params, {
                              type: '',
                          })}
                          component={Search}/>
            <Stack.Screen name="Scanner" component={Scanner}/>
            <Stack.Screen name="Product Info"
                          initialParams={props.route.params}
                          component={ProductInfo}/>
        </Stack.Navigator>
    )

}
