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
import {default as axios} from "axios";
import {getUserInfo} from '../functions/getUserInfo';

const deviceWidth = Dimensions.get('window').width;

function Home(props) {

    const [loaded, setLoaded] = useState(false);
    const axios = require('axios').default;

    const onRefresh = () => {
        getUserInfo(setLoaded, props.route.params.setUser, props.route.params.setIsAuth);
    }

    useEffect(() => {
        getUserInfo(setLoaded, props.route.params.setUser, props.route.params.setIsAuth);
    }, []);

    if (loaded) {
        return (
            <ScrollView refreshControl={
                <RefreshControl onRefresh={onRefresh}/>}>
                <SafeAreaView style={styles.body}>
                    <ImageBackground imageStyle={{
                        borderRadius: 50,
                    }} resizeMode={'cover'} source={require('../images/backgroundForUser.jpg')}
                                     style={styles.welcomeView}>
                        <Text style={styles.welcomeText}>Welcome, {props.route.params.user.first_name}</Text>
                    </ImageBackground>
                    <View style={styles.shortcutsView}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Settings')
                        }} style={styles.buttonView}>
                            <Ionicons name="cog" color={Colors.defaultBackgroundColor} size={40}/>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    } else {
        return <Loading/>;
    }


}

const Stack = createNativeStackNavigator();

export default function HomeStack(props) {

    const [user, setUser] = useState({});

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home"
                          initialParams={Object.assign(props.route.params, {
                              user: user,
                              setUser: setUser,
                          })}
                          component={Home}/>
            <Stack.Screen name="Settings"
                          initialParams={Object.assign(props.route.params, {
                              user: user,
                              setUser: setUser,
                          })}
                          component={Settings}/>
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
    welcomeView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: (deviceWidth / 2) - 20,
        margin: 20,
        width: (deviceWidth) - 20,
    },
    shortcutsView: {
        backgroundColor: Colors.appColor,
        width: (deviceWidth) - 20,
        height: (deviceWidth / 2) - 20,
        borderRadius: 50,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
