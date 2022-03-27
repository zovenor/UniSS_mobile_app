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
    ImageBackground,
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

const deviceWidth = Dimensions.get('window').width;

function Shops() {
    const [loaded, setLoaded] = useState(false)
    const [shops, setShops] = useState([]);
    const [shopNames, setShopNames] = useState({});
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

        axios(data).then(response => {
            let shops_h = response.data.shops;
            for (let el in shops_h) {
                data2.headers.shop = response.data.shops[el].id;
                axios(data2).then((response2) => {
                    setShops(response.data.shops);
                    setShopNames(Object.assign(shopNames, {[response.data.shops[el].id.toString()]: response2.data.shop_name.toString()}));
                }).catch(error => {
                    console.log(error);
                });
            }

        }).catch(error => {
            setLoaded(true);
            console.log(error);
        });
    }

    const onRefresh = () => {
        get_shops();
    }

    const Item = ({item}) => {
        return (
            <TouchableOpacity style={styles.shop}>
                <ImageBackground imageStyle={{borderRadius: 50, opacity: 0.5}} style={styles.shopBackground} resizeMode={'cover'} source={require('../images/shopBakground.jpg')}>
                    <Text style={styles.shopText}>{shopNames[item.id.toString()]}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    useEffect(()=>{
        get_shops();
        setLoaded(true);
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
                        renderItem={Item}
                        style={{
                            width: '100%',
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

export default function ShopStack(props){
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
    shop: {
        margin: 10,
        marginBottom: 0,
        minWidth: (deviceWidth) - 40,
        backgroundColor: Colors.defaultFontColor,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: (deviceWidth / 2) - 20,
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    shopText: {
        fontSize: 20,
        display: 'flex',
        color: Colors.defaultBackgroundColor,
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
    shopBackground: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    buttonsView: {
        flexDirection: 'row',
        margin: 10,
        paddingRight: 15,
        paddingLeft: 15,
        justifyContent: 'flex-end',
        backgroundColor: Colors.appColor,
        borderRadius: 50,
        height: (deviceWidth/4)-20,
        alignItems: 'center',
    }
})
