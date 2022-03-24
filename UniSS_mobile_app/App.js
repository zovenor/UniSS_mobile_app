import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './app/screens/Home';
import Products from './app/screens/Products';
import Login from './app/screens/Login';
import LoadingApp from './app/screens/LoadingApp';
import {Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from "react";
import Colors from './app/config/colors';


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
                <NavigationContainer>
                    <Tab.Navigator initialRouteName="Home" screenOptions={{
                        tabBarActiveTintColor: Colors.activeIcon,
                        tabBarInactiveTintColor: Colors.unActiveIcon,
                        headerTintColor: Colors.defaultFontColor,
                    }}>
                        <Tab.Screen initialParams={{
                            setIsAuth: setIsAuth,
                            isAuth: isAuth,
                        }} name={'Home'} component={Home} options={{title: "Home"}}/>
                        <Tab.Screen name={'Products'} component={Products} options={{title: "Products"}}/>
                    </Tab.Navigator>
                    <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true}/>
                </NavigationContainer>
            );
        }
        else{
            return <Login isAuth={isAuth} setIsAuth={setIsAuth}></Login>
        }
    }
    else{
        return <LoadingApp></LoadingApp>
    }


}

const styles = StyleSheet.create({
})
