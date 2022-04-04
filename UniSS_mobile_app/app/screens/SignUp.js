import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Colors from "../config/colors";
import {useState} from "react";
import RequestData from "../config/requests";
import Loading from "../components/loading";
import {login} from "../functions/login";

export const SignUp = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [loaded, setLoaded] = useState(true);

    const axios = require('axios').default;

    const register = (reg_username, reg_password, reg_password2, reg_email)=>{
        if(reg_password!==reg_password2){
            Alert.alert('Sign up', "Password don't match!");
        }
        else{
            const data = {
                url: RequestData.baseUrl + '/api/v1/register/',
                method: 'post',
                headers: {
                    'App-Token': RequestData.app_token,
                },
                data: {
                    username: reg_username,
                    password: reg_password,
                    email: reg_email,
                }
            }
            axios(data).then(async (response) => {
                console.log(response.data);
                props.setRegister(false);
                login(props.setIsAuth, setLoaded, reg_username, reg_password);
            }).catch(error => {
                console.log(error);
                if(error.response.status===400){
                    Alert.alert('Sign up', 'A user with this username exists!');
                }
                else{
                    Alert.alert('Sign up', 'Wrong data!');
                }
            })
            console.log(reg_username, reg_password, reg_password2);
        }
    }

    if(loaded){
        return (
            <View style={styles.body}>
                <View style={styles.welcomeView}>
                    <Image source={require('../images/signUp.png')} style={styles.welcomeImage}/>
                </View>
                <ScrollView style={styles.inputView}>
                    <Text style={styles.loginText}>Sign up</Text>
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
                        <View style={styles.textInputView}>
                            <TextInput secureTextEntry={true} onChangeText={newPassword => {
                                setPassword2(newPassword);
                            }} style={styles.textInput} editable placeholder={'Repeat password'}/>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput secureTextEntry={true} onChangeText={newEmail => {
                                setEmail(newEmail);
                            }} style={styles.textInput} editable placeholder={'Email'}/>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity onPress={() => {
                                register(username, password, password2, email)
                            }} style={styles.submitTouchEnable}>
                                <Text style={styles.submitTextEnable}>Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                props.setRegister(false)
                            }} style={styles.submitTouch}>
                                <Text style={styles.submitText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
    else{
        return <Loading/>
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
        flex: 0.7,
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
        // alignItems: 'center',
        padding: 40,
    },
    loginText: {
        fontSize: 30,
        color: Colors.defaultFontColor,
        marginBottom: 20,
        textAlign: 'center',
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
