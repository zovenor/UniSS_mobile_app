import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../config/colors';
import {useState} from "react";
import RequestData from "../config/requests";
import Loading from "../components/loading";

export default function Login(props) {

    let login = async () => {
        setLoaded(false);
        const app_token = RequestData.app_token;
        const data = {
            method: 'POST',
            headers: {
                'App-Token': app_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password,
                }
            ),
        }
        const url = RequestData.url + '/api/v1/token/';
        await fetch(url, data).then((response) => {
            if (response.status != 200) {
                Alert.alert('Wrong data!');
                setLoaded(true);
            }
            else{
                return response.json();
            }
        }).then(responseJSON => {
            if (responseJSON !== undefined) {
                AsyncStorage.setItem('Auth-Token', JSON.stringify(responseJSON.token));
                props.setIsAuth(true);
                setLoaded(true);
            }
        });
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loaded, setLoaded] = useState(true);

    if(loaded){
        return (
            <View style={styles.body}>
                <View style={styles.welcomeView}>
                    <Image source={require('../icons/food_cart.png')} style={styles.welcomeImage}/>
                </View>
                <View style={styles.inputView}>
                    <Text style={styles.loginText}>Login</Text>
                    <View style={styles.formView}>
                        <View style={styles.textInputView}>
                            <TextInput onChangeText={newUsername => {
                                setUsername(newUsername);
                            }} style={styles.textInput} editable placeholder={'Username'}/>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput secureTextEntry={true} onChangeText={newPassword => {
                                setPassword(newPassword);
                            }} style={styles.textInput} editable placeholder={'Password'}/>
                        </View>
                        <TouchableOpacity onPress={login} style={styles.submitTouch}>
                            <Text style={styles.submitText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    else{
        return <Loading></Loading>;
    }
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.appColor,
        flex: 1,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 30,
        marginTop: 20,
        color: Colors.defaultFontColor,
    },
    welcomeView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeImage: {
        width: 125,
        height: 125,
        borderRadius: 35,
    },
    inputView: {
        flex: 1.5,
        backgroundColor: Colors.defaultBackgroundColor,
        width: '100%',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        alignItems: 'center',
        padding: 40,
    },
    loginText: {
        fontSize: 30,
        color: Colors.defaultFontColor,
        marginBottom: 20,
    },
    textInput: {
        padding: 10,
        borderRadius: 100,
        fontSize: 20,
        color: Colors.defaultFontColor,
        width: 300,
    },
    textInputView: {
        borderColor: Colors.defaultFontColorLight,
        borderBottomWidth: 1,
        margin: 15,
    },
    submitText: {
        fontSize: 20,
        color: Colors.defaultBackgroundColor,
    },
    submitTouch: {
        backgroundColor: Colors.activeIcon,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 999,
        marginTop: 20,
    },
    formView: {
        alignItems: 'center',
    },
})
