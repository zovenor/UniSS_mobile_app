import {useEffect, useState} from "react";
import Requests from "../config/requests";
import RequestData from "../config/requests";
import {default as axios} from "axios";
import {
    Dimensions,
    FlatList,
    LogBox,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../config/colors";
import {Shop} from "../components/Shop";
import Loading from "../components/loading";

const deviceWidth = Dimensions.get('window').width;

export default function Shops(props) {
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
            <View style={styles.body}>
                <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}/>}>
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={shops}
                            renderItem={Shop}
                            style={{
                                width: deviceWidth,
                            }}
                            conten
                        />
                </ScrollView>
                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={()=>{
                        props.navigation.navigate('Search');
                    }} style={styles.buttonView}>
                        <Ionicons name="search" color={Colors.defaultBackgroundColor} size={30} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonView}>
                        <Ionicons name="navigate" color={Colors.defaultBackgroundColor} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else{
        return(
            <Loading/>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
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
        justifyContent: 'space-evenly',
        backgroundColor: Colors.appColor,
        alignItems: 'center',
        height: (deviceWidth - 20) / 6,
        width: (deviceWidth - 20) / 3,
        borderRadius: 50,
        marginTop: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 100,
        flexDirection: "row",
    },
    list: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
})
