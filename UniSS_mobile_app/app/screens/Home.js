import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import Colors from '../config/colors'
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestData from "../config/requests";
import Loading from "./Loading";
import Login from "./Login";

export default function Home(props) {

    const [name, setName] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const logout = async ()=>{
        await AsyncStorage.setItem('Auth-Token', '');
        props.setAuth(false);
    }

    const url = RequestData.url + '/api/v1/user/';
    const app_token = RequestData.app_token;

    AsyncStorage.getItem('Auth-Token').then(async (token)=>{
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'App-Token': app_token,
                'Auth-Token': JSON.parse(token),
            }
        }
        fetch(url, data).then(response=>{
            return response.json()
        }).then(responseJSON=>{
            setName(responseJSON.user.first_name);
        });
    });

    if(false){
        return (
            <SafeAreaView style={styles.body}>
                <Text style={styles.userName}>Hi, {name}</Text>
                <Button onPress={logout} title={'Logout'} />
            </SafeAreaView>
        )
    }
    else{
        return <Login isAuth={props.isAuth} setIsAuth={props.setIsAuth}></Login>
    }
}

const styles = StyleSheet.create({
    body: {
        display: "flex",
        alignItems: 'center',
        flex: 1,
    },
    userName: {
        fontSize: 40,
        marginTop: 40,
        color: Colors.defaultFontColor
    },
})
