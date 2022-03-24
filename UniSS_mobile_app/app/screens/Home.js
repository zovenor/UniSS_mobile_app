import {StyleSheet, SafeAreaView, Text, Button, ImageBackground} from 'react-native';
import Colors from '../config/colors'
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestData from "../config/requests";
import LoadingApp from "./LoadingApp";
import Login from "./Login";
import Loading from '../components/loading';

export default function Home(props) {

    const [name, setName] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const logout = async () => {
        await AsyncStorage.setItem('Auth-Token', '');
        props.route.params.setIsAuth(false);
    }

    const url = RequestData.url + '/api/v1/user/';
    const app_token = RequestData.app_token;

    // if(props.route.params.isAuth){
    //     setLoaded(true);
    // }

    AsyncStorage.getItem('Auth-Token').then(async (token) => {
        let data = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'App-Token': app_token,
                'Auth-Token': JSON.parse(token),
            }
        }
        await fetch(url, data).then(response => {
            if(response.status==200){
                return response.json();
            }
        }).then(responseJSON => {
            if(responseJSON!==undefined){
                setName(responseJSON.user.first_name);
                setLoaded(true);
            }
        });
    });

        if(loaded){
            return (
                <SafeAreaView style={styles.body}>
                    <Text style={styles.userName}>Hi, {name}</Text>
                    <Button color={'red'} onPress={logout} title={'Logout'}/>
                </SafeAreaView>
            )
        }else{
            return <Loading></Loading>;
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
