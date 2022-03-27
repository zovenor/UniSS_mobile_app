import {
    StyleSheet,
    SafeAreaView,
    Text,
    Button,
    Alert,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    View,
} from 'react-native';
import Colors from '../config/colors'
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RequestData from "../config/requests";
import Loading from '../components/loading';
import {Ionicons} from "@expo/vector-icons";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "./Settings";

const deviceWidth = Dimensions.get('window').width;

function Home(props) {

    const [name, setName] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const axios = require('axios').default;

    const logout = () => {
        Alert.alert('Logout', 'Do you want to log out?', [
            {
                text: 'No',
            },
            {
                text: 'Yes',
                onPress: ()=>{
                    AsyncStorage.setItem('Auth-Token', '');
                    props.route.params.setIsAuth(false);
                }
            }
        ]);
    }

    // const url = RequestData.baseUrl + '/api/v1/user/';
    // const app_token = RequestData.app_token;
    //
    // // if(props.route.params.isAuth){
    // //     setLoaded(true);
    // // }
    //
    // AsyncStorage.getItem('Auth-Token').then(async (token) => {
    //     let data = {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'App-Token': app_token,
    //             'Auth-Token': JSON.parse(token),
    //         }
    //     }
    //     await fetch(url, data).then(response => {
    //         if(response.status==200){
    //             return response.json();
    //         }
    //     }).then(responseJSON => {
    //         if(responseJSON!==undefined){
    //             setName(responseJSON.user.first_name);
    //             setLoaded(true);
    //         }
    //     });
    // });

    const onRefresh = () => {
        getUserInfo();
    }

    const getUserInfo = async () => {
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
                setName(response.data.user.first_name);
            })
            .catch(error => {
                console.log(error.response.data);
                Alert.alert('Get info', 'Error');
                // getUserInfo();
            });
    };

    useEffect(getUserInfo, []);

    if (loaded) {
        return (
            <ScrollView refreshControl={
                <RefreshControl onRefresh={onRefresh} />}>
                <SafeAreaView style={styles.body}>
                    <ImageBackground imageStyle={{
                        borderRadius: 50,
                    }} resizeMode={'cover'} source={require('../images/backgroundForUser.jpg')} style={styles.welcomeView}>
                        <Text style={styles.welcomeText}>Welcome, {name}</Text>
                    </ImageBackground>
                    <View style={styles.shortcutsView}>
                        <TouchableOpacity onPress={()=>{props.navigation.navigate('Settings')}} style={styles.buttonView}>
                            <Ionicons name="cog" color={Colors.defaultBackgroundColor} size={40} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={logout} style={styles.buttonLogoutView}>
                        <Text style={styles.buttonLogoutText}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    } else {
        return <Loading/>;
    }


}

const Stack = createNativeStackNavigator();

export default function HomeStack(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" initialParams={props.route.params} component={Home}/>
            <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    body: {
        display: "flex",
        alignItems: 'center',
        flex: 1,
    },
    welcomeText: {
        fontSize: 40,
        color: Colors.defaultFontColor,
        margin: 20,
    },
    buttonLogoutView: {
        // backgroundColor: Colors.red,
        padding: 15,
        width: (deviceWidth/2) - 60,
        borderRadius: 50,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.red,
        margin: 10,
    },
    buttonLogoutText: {
        fontSize: 15,
        textAlign: 'center',
        color: Colors.red,
    },
    welcomeView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: (deviceWidth/2)-20,
        margin: 20,
        width: (deviceWidth)-20,
    },
    shortcutsView: {
        backgroundColor: Colors.appColor,
        width: (deviceWidth) -20,
        height: (deviceWidth/2) - 20,
        borderRadius: 50,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
