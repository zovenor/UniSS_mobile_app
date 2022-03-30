import {useEffect, useState} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "./Settings";
import Home from './Home';
import {getUserInfo} from "../functions/getUserInfo";
import Search from "./Search";

const Stack = createNativeStackNavigator();

export default function HomeStack(props) {

    const [user, setUser] = useState({});

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home"
                          initialParams={props.route.params}
                          component={Home}/>
            <Stack.Screen name="Settings"
                          initialParams={props.route.params}
                          component={Settings}/>
            <Stack.Screen name="Search"
                          initialParams={props.route.params}
                          component={Search}/>
        </Stack.Navigator>
    )

}