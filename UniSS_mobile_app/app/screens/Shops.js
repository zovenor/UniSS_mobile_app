import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    Dimensions,
    ImageBackground, LogBox,
} from "react-native";
import {useState, useEffect} from "react";
import Colors from "../config/colors";
import axios from 'axios';
import Requests from "../config/requests";
import RequestData from "../config/requests";
import { Ionicons } from '@expo/vector-icons'
import Loading from '../components/loading'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "./Settings";
import {Shop} from '../components/Shop';

const deviceWidth = Dimensions.get('window').width;

function Shops() {
    const [loaded, setLoaded] = useState(false)
    const [shops, setShops] = useState([]);
    const axios = require('axios').default;

    const get_shops = () => {
        const data = {
            method: 'get',
            url: Requests.baseUrl + '/api/v1/shops/',
            headers: {
                'App-Token': Requests.app_token,
            }
        }

        const data2 = {
            method: 'get',
            url: RequestData.baseUrl + '/api/v1/get_shop_name/',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        axios(data).then(async (response) => {
            let shops_h = response.data.shops;
            for (let el in shops_h) {
                data2.headers.shop = response.data.shops[el].id;
                await axios(data2).then((response2) => {
                    shops_h[el].shopName = response2.data.shop_name.toString()
                }).catch(error => {
                    console.log(error);
                });
            }
            setShops(shops_h);
            setLoaded(true);

        }).catch(error => {
            setLoaded(true);
            console.log(error);
        });
    }

    const onRefresh = () => {
        get_shops();
    }

    useEffect(()=>{
        get_shops();
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
    }, [])

    if(loaded){
        return (
            <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}/>}>
                <SafeAreaView style={styles.body}>
                    <View style={styles.buttonsView}>
                        <TouchableOpacity style={styles.buttonView}>
                            <Ionicons name="search" color={Colors.defaultBackgroundColor} size={40} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonView}>
                            <Ionicons name="navigate" color={Colors.defaultBackgroundColor} size={40} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={shops}
                        renderItem={Shop}
                        style={{
                            width: deviceWidth,
                        }}
                        conten
                    />
                </SafeAreaView>
            </ScrollView>
        )
    }
    else{
        return(
            <Loading/>
        )
    }
}

const Stack = createNativeStackNavigator();

export default function ShopsStack(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Shops" initialParams={props.route.params} component={Shops}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    buttonView: {
        height: 45,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: 10,
    },
    buttonText: {
        color: Colors.appColor,
        fontSize: 20,
    },
    buttonsView: {
        flexDirection: 'row',
        margin: 10,
        paddingRight: 15,
        paddingLeft: 15,
        justifyContent: 'space-evenly',
        backgroundColor: Colors.appColor,
        borderRadius: 50,
        height: (deviceWidth/4)-20,
        alignItems: 'center',
    },
    list: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
})
