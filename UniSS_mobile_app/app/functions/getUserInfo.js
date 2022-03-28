import RequestData from "../config/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {default as axios} from "axios";
import {Alert} from "react-native";
import {logout} from "./logout";

export const getUserInfo = async (setLoaded, setUser, setIsAuth) => {
    setLoaded(false);

    const axios = require('axios').default;

    const data = {
        method: 'get',
        headers: {
            'App-Token': RequestData.app_token,
            'Auth-Token': await AsyncStorage.getItem('Auth-Token'),
        },
        url: RequestData.baseUrl + '/api/v1/user/',

    }

    axios(data)
        .then(response => {
            setLoaded(true);
            setUser(response.data.user);
        })
        .catch(error => {
            Alert.alert('Get info', 'Error', [
                {
                    text: 'Reload',
                    onPress: ()=>{
                        getUserInfo(setLoaded, setUser);
                    }
                },
                {
                    text: 'Logout',
                    onPress: () => {
                        logout(setIsAuth);
                    }
                }
            ]);
        });
};
