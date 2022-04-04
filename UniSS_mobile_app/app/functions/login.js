import RequestData from "../config/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

const axios = require('axios').default;

export const login = async (setIsAuth,setLoaded, username, password) => {
    setLoaded(false);
    const data = {
        method: 'post',
        url: RequestData.baseUrl + '/api/v1/token/',
        headers: {
            'App-Token': RequestData.app_token,
        },
        data: {
            username: username,
            password: password,
        }
    };

    const get_response = () => axios(data)
        .then(response => {
            if (response.status === 200) {
                AsyncStorage.setItem('Auth-Token', response.data.token.toString());
                setLoaded(true);
                setIsAuth(true);
            }
        })
        .catch(error => {
            Alert.alert('Login', 'Wrong data!');
            console.log(error);
            setLoaded(true);
        });
    if((username==='')||(password==='')){
        Alert.alert('Login', 'Wrong data!');
        setLoaded(true);
    }
    else{
        get_response();
    }
};
