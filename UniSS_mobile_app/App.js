import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './app/screens/HomeStack';
import ProductsStack from './app/screens/ProductsStack';
import Login from './app/screens/Login';
import LoadingApp from './app/screens/LoadingApp';
import {Image, LogBox, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from "react";
import Colors from './app/config/colors';
import { Ionicons } from '@expo/vector-icons'
import ShopsStack from "./app/screens/ShopsStack";


export default function App() {

    const [loaded, setLoaded] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

     setTimeout(()=>{
         AsyncStorage.getItem('Auth-Token').then(result=>{
             if((result === null) || (result === '')){
                 setLoaded(true);
                 setIsAuth(false);
             }
             else{
                 setLoaded(true);
                 setIsAuth(true);
             }
         })
     }, 3000);

    if(loaded){
        if(isAuth){
            const Tab = createBottomTabNavigator();
            return (
                <NavigationContainer >
                    <Tab.Navigator screenOptions={{
                        tabBarActiveTintColor: Colors.activeIcon,
                        tabBarInactiveTintColor: Colors.unActiveIcon,
                        headerTintColor: Colors.defaultFontColor,
                        headerShown: false,
                    }}>
                        <Tab.Screen initialParams={{
                            setIsAuth: setIsAuth,
                            isAuth: isAuth,
                        }} name={'HomeStack'} component={HomeStack} options={{
                            title: "Home",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="home" color={color} size={size} />
                            ),
                        }}/>
                        <Tab.Screen name={'ProductsStack'} component={ProductsStack} options={{
                            title: "Products",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="pizza" color={color} size={size} />
                            ),
                        }}/>
                        <Tab.Screen name={'ShopsStack'} component={ShopsStack} options={{
                            title: "Shops",
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons name="cart" color={color} size={size} />
                            ),
                        }}/>
                    </Tab.Navigator>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true}/>
                </NavigationContainer>
            );
        }
        else{
            return <Login isAuth={isAuth} setIsAuth={setIsAuth}/>
        }
    }
    else{
        return <LoadingApp/>
    }


}

const styles = StyleSheet.create({
})
