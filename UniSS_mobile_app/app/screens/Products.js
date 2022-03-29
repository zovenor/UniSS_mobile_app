import {useState, useEffect} from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    RefreshControl,
    Dimensions,
    ImageBackground,
} from "react-native";
import RequestData from '../config/requests';
import Loading from '../components/loading';
import Colors from "../config/colors";
import {default as axios} from "axios";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Settings from "./Settings";

const deviceWidth = Dimensions.get('window').width;

function Products({navigation}) {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [shopNames, setShopNames] = useState({});

    const onRefresh = () => {
        get_products();
    }

    const Item = ({item}) => {
        return (
            <TouchableOpacity style={styles.product}>
                <ImageBackground imageStyle={{
                    opacity: .5,
                    borderRadius: 50,
                }} style={styles.productBackground} resizeMode={'cover'} source={require('../images/foodBackground.jpg')}>
                    <Text style={styles.productText}>{item.name} - {item.price} {item.currency}</Text>
                    <Text style={styles.productText}>{shopNames[item.id.toString()]}</Text>
                    <Text style={styles.productCode}>{item.code}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    const axios = require('axios').default;

    const get_products = () => {
        // setLoaded(false);
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
                console.log(products_request);
                for (let el in products_request) {
                    data2.headers.product = products_request[el].id;
                    axios(data2).then(response => {
                        setProducts(products_request)
                        setShopNames(Object.assign(shopNames, {[products_request[el].id]:response.data.shop_name.toString()}))
                    }).catch(error => {
                        console.log(error);
                    });
                }
                setLoaded(true);
            })
            .catch(error => {
                setLoaded(true);
                console.log(error);
            });
    }

    useEffect(get_products, []);

    if (loaded) {
        return (
            <ScrollView refreshControl={<RefreshControl onRefresh={onRefresh}/>}>
                <SafeAreaView style={styles.body}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={products}
                        renderItem={Item}
                        style={{
                            width: deviceWidth,
                        }}
                        conten
                    />
                </SafeAreaView>
            </ScrollView>
        )
    } else {
        return <Loading/>;
    }
}

const Stack = createNativeStackNavigator();

export default function ProductsStack(props){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Products" initialParams={props.route.params} component={Products}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    product: {
        minWidth: (deviceWidth) - 20,
        backgroundColor: Colors.defaultFontColor,
        borderRadius: 50,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: (deviceWidth / 2) - 20,
    },
    productText: {
        fontSize: 20,
        color: Colors.defaultBackgroundColor,
    },
    list: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingRight: 10,
    },
    productCode: {
        color: Colors.defaultBackgroundColor,
        position: 'absolute',
        bottom: 10,
    },
    productBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
