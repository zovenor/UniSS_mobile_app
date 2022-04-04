import {useEffect, useState} from "react";
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
    TouchableOpacity, View
} from "react-native";
import {Product} from "../components/Product";
import Loading from "../components/loading";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../config/colors";

const deviceWidth = Dimensions.get('window').width;

export default function Products(props) {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const onRefresh = () => {
        get_products();
    }

    const axios = require('axios').default;

    const get_products = () => {
        const data = {
            method: 'get',
            url: RequestData.baseUrl + '/api/v1/products/',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        const data2 = {
            method: 'get',
            url: RequestData.baseUrl + '/api/v1/get_shop_name/',
            headers: {
                'App-Token': RequestData.app_token,
            }
        }

        axios(data)
            .then(async (response) => {
                let products_request = response.data.products;
                for (let el in products_request) {
                    data2.headers.product = products_request[el].id;
                    await axios(data2).then(response => {
                        products_request[el].shopName=response.data.shop_name.toString()
                    }).catch(error => {
                        console.log(error);
                    });
                }
                setProducts(products_request)
                setLoaded(true);
            })
            .catch(error => {
                setLoaded(true);
                console.log(error);
            });
    }

    useEffect(()=>{
        get_products();
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, []);

    if (loaded) {
        return (
            <View style={styles.body}>
                <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}/>}>
                        <FlatList
                            contentContainerStyle={styles.list}
                            data={products}
                            renderItem={({item})=> {
                                return Product({item, navigation: props.navigation});
                            }}
                            style={{
                                width: deviceWidth,
                            }}
                        />
                </ScrollView>
                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={()=>{
                        props.navigation.navigate('Search');
                    }} style={styles.buttonView}>
                        <Ionicons name="search" color={Colors.defaultBackgroundColor} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    } else {
        return <Loading/>;
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    list: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
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
        justifyContent: 'space-evenly',
        backgroundColor: Colors.appColor,
        alignItems: 'center',
        height: (deviceWidth - 20) / 6,
        width: (deviceWidth - 20) / 6,
        borderRadius: 50,
        marginTop: 10,
        position: 'absolute',
        bottom: 20,
        zIndex: 100,
        right: 20,
    },
})
