import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../config/colors';
import {useState} from "react";
import RequestData from "../config/requests";
import Loading from "../components/loading";
import axios from 'axios';
import {login} from "../functions/login";

export default function Login(props) {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loaded, setLoaded] = useState(true);

    if (loaded) {
        return (
            <View style={styles.body}>
                <View style={styles.welcomeView}>
                    <Image source={require('../images/login.png')} style={styles.welcomeImage}/>
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

                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => {
                                login(props.setIsAuth, setLoaded, username, password);
                            }} style={styles.submitTouchEnable}>
                                <Text style={styles.submitTextEnable}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                props.setRegister(true)
                            }} style={styles.submitTouch}>
                                <Text style={styles.submitText}>Sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    } else {
        return <Loading/>;
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
        width: 300,
        height: 300,
    },
    inputView: {
        flex: 1,
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
    submitTextEnable: {
        fontSize: 20,
        color: Colors.defaultBackgroundColor,
    },
    submitText: {
        fontSize: 20,
        color: Colors.appColor,
    },
    submitTouchEnable: {
        margin: 10,
        backgroundColor: Colors.appColor,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 999,
        marginTop: 20,
    },
    submitTouch: {
        margin: 10,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 999,
        marginTop: 20,
        borderWidth: 2,
        borderColor: Colors.appColor,
        borderStyle: 'dashed'
    },
    formView: {
        alignItems: 'center',
    },
})
